---
layout: doc
title: Le mode Graphe
category: "Général"
category_key: "Meta"
api_type: blocks
description: "Comment une commande ou un workflow Bot Creator est stocké et exécuté sous forme de graphe : nœuds, pins, liens, jonctions, erreurs, conversion automatique des anciennes commandes et validation."
locale: fr
lang: fr
content_language: fr
translation_key: doc-graph
permalink: /fr/docs/graph/
sidebar_context: docs_fr
---

# Le mode Graphe

Dans Bot Creator, une commande ou un workflow construit visuellement (le mode « Blocks ») est un **graphe** : chaque bloc est un **nœud**, et des **liens** relient la sortie d'un nœud (un *pin*) aux nœuds qui suivent. Un seul moteur exécute tous les graphes. Les modes BDFD (script) et JavaScript ne changent pas.

> Cette page décrit le format et le comportement du moteur. L'éditeur graphique (canvas sur ordinateur, liste linéaire modifiable sur téléphone) arrive **bientôt** : tant qu'il n'est pas livré, ces pages servent surtout aux utilisateurs de l'API, du MCP et de l'import de fichiers.

## Les anciennes commandes ne sont pas cassées

Une commande ou un workflow écrit dans l'ancien format (une liste d'actions imbriquées, `executionMode: "workflow"`) est **converti automatiquement en graphe** quand il est lu, exécuté, édité, restauré ou importé. La conversion est une fonction pure et très rapide, sans migration globale : seul ce qui est utilisé est converti.

- Ce que l'ancien format permettait est reproduit. Quand le graphe ne peut pas le reproduire exactement, la conversion le **signale** par un avertissement (jamais en silence) : saut en arrière, référence `((action.<clé>.iter<N>.…))`, ordre des branches parallèles…
- Les anciens blocs *Aller à l'action* et *Sauter N actions* deviennent des nœuds **Aiguillage** (`switch`).
- Les anciennes versions d'une commande restent restaurables ; une version restaurée repasse par la conversion.

## Le format stocké

Une commande ou un workflow en mode graphe porte `executionMode: "graph"` et un champ `graph` :

<details>
<summary>Exemple : réponse conditionnelle</summary>

```json
{
  "version": 2,
  "nodes": [
    {
      "id": "n1",
      "type": "ifBlock",
      "key": "action_0",
      "enabled": true,
      "payload": {
        "condition.variable": "((guild.id))",
        "condition.operator": "isNotEmpty"
      }
    },
    {
      "id": "n2",
      "type": "respondWithMessage",
      "key": "action_1",
      "enabled": true,
      "payload": { "content": "Cette commande tourne dans un serveur." }
    },
    {
      "id": "n3",
      "type": "respondWithMessage",
      "key": "action_2",
      "enabled": true,
      "payload": { "content": "Utilise cette commande dans un serveur." }
    }
  ],
  "links": [
    { "from": { "node": "start", "pin": "next" }, "to": "n1" },
    { "from": { "node": "n1", "pin": "then" }, "to": "n2" },
    { "from": { "node": "n1", "pin": "else" }, "to": "n3" }
  ],
  "data": []
}
```

</details>

### Les nœuds

| Champ | Sens |
|---|---|
| `id` | Identifiant interne stable (`n1`, `n2`…), jamais réutilisé. Les liens s'y réfèrent. `start` est réservé. |
| `type` | Le type de bloc (voir le [dictionnaire des blocs](/docs/blocks-dictionary/)), ou `tryCatch` / `switch`. |
| `key` | La **clé de résultat**, obligatoire et non vide. Le résultat se lit `((action.<clé>))` dans les nœuds suivants. Elle n'est pas forcément unique : comme avant, le dernier écrivain gagne. L'éditeur donnera `action_<n>` à chaque nouveau bloc. |
| `enabled` | `true` par défaut. Un nœud désactivé ne produit aucun résultat, le flux passe. |
| `payload` | Les valeurs des champs du bloc. Il ne contient plus aucune liste d'actions imbriquée. |
| `error` | `{ "mode": "stop" }` (défaut) ou `{ "mode": "continue" }`. |

Les références `((action.<clé>))` restent le moyen principal de passer un résultat d'un bloc à un autre. Les liens de données (`data`) sont facultatifs.

### Les pins et les liens

Un lien de flux est `{ "from": { "node", "pin" }, "to" }`. Le point de départ est le pseudo-nœud `start` (pin `next`), qui n'est pas dans `nodes`.

| Nœud | Pins de sortie |
|---|---|
| Tout bloc ordinaire | `next`, `error` |
| `ifBlock` (SI / SINON) | `then`, `elseif:<i>` (un par condition « sinon si »), `else`, `error` |
| `forLoop`, `jsonForEachLoop` | `body` (le corps), `done` (la suite), `error` |
| `tryCatch` | `try`, `catch`, `done`, `error` |
| `switch` | `case:<valeur>` (un par valeur), `default`, `error` |

- Plusieurs liens sur un même pin lancent des **branches parallèles**, dans l'ordre des liens (voir l'exécution ci-dessous : jamais en même temps).
- Un pin `error` relié mène aux blocs à exécuter quand le nœud échoue.
- Les branches d'un `ifBlock` sont **libres** : elles peuvent se rejoindre sur un même nœud.
- Les boucles et `tryCatch` ouvrent une **région fermée** : aucun lien ne sort de la région et aucun lien extérieur n'y entre (sauf par le pin d'entrée).

### Aiguillage (`switch`)

`payload.value` est un modèle résolu à l'exécution ; il est comparé aux pins `case:<valeur>`, sinon le flux suit `default`. `payload.mode` vaut `text` (défaut : comparaison après suppression des espaces autour) ou `int` (comparaison numérique). `payload.resultPrefix` fixe le préfixe du résultat écrit (`<préfixe><valeur>`).

### Écouteurs, modals et composants

Un bouton, un menu, un modal ou un écouteur qui portait une liste d'actions en ligne porte maintenant un **sous-graphe** `graph`, exécuté plus tard dans une nouvelle exécution. Un gestionnaire nommé reste une référence `workflowName`.

## Comment un graphe s'exécute

1. **Ordre déterministe, sans concurrence** : après un nœud, on suit ses liens dans l'ordre, en profondeur. C'est aussi l'ordre de la vue liste mobile.
2. **Jonction** : un nœud qui a plusieurs entrées s'exécute **une seule fois**, quand toutes sont résolues (arrivées ou mortes). Un chemin non pris est mort ; un nœud dont toutes les entrées sont mortes est mort.
3. **Régions** : un corps de boucle ou une région `try` / `catch` repart d'un état frais à chaque tour ; les clés de résultat de ses nœuds sont écrasées à chaque tour (il n'y a plus de clés `iter<N>`).
4. **Erreurs** : un nœud en échec suit ses liens `error` s'il en a ; sinon, avec `error.mode = continue`, l'erreur est notée et le flux continue par `next` ; sinon l'erreur remonte et l'exécution échoue.
5. **Arrêt** : `stop`, `stopUnless` et `cooldown` arrêtent tout le graphe en cours. Dans un workflow appelé par `runWorkflow`, ils n'arrêtent que ce workflow.
6. **Acquittement** : l'interaction est différée avant le premier nœud, sauf si un nœud activé `deferInteraction` ou `respondWithModal` existe dans le graphe racine, ou si `autoDeferIfActions` vaut `false`.
7. **Garde-fous** : 15 minutes par commande et un nombre maximal de pas par exécution.

Le détail du moteur est dans le [modèle d'exécution](/docs/execution-model/) (anglais).

## Validation

Un graphe est validé avant d'être enregistré. Les **erreurs** bloquent : lien vers un nœud ou un pin inconnu, nœud ou type inconnu, identifiant dupliqué ou réservé, cycle de flux (une boucle se fait avec un nœud de boucle), région non fermée, réponses initiales parallèles (Discord n'en accepte qu'une), taille (2000 nœuds, 2 000 000 octets de JSON au maximum), clé vide. Les **avertissements** ne bloquent pas : nœud orphelin (relié à rien, il ne s'exécute jamais), clé de résultat partagée par plusieurs nœuds, aiguillage sans valeur, boucle ou `try` sans corps.

Le serveur [MCP](/docs/mcp/) expose l'outil `validate_graph`, qui applique ces règles et vérifie aussi les paramètres de chaque nœud. Il accepte aussi une ancienne liste d'actions (`actions`) ou une commande entière (`entity`) : il la convertit et répond avec le graphe obtenu et les avertissements de conversion.

## Convertir un script BDFD

Un script BDFD peut être converti en graphe, et un graphe en script BDFD : voir [BDFD et Graphe](/fr/docs/bdfd-graph/).
