---
layout: doc
title: API publique
category: "Général"
category_key: "Meta"
description: Pilotez votre bot depuis votre propre code avec l'API publique de Bot Creator. Clés API, permissions, limites, erreurs et exemples à copier. Réservé à Premium.
locale: fr
lang: fr
content_language: fr
translation_key: doc-public-api
permalink: /fr/docs/public-api/
sidebar_context: docs_fr
---

L'API publique de Bot Creator permet à votre propre code de piloter un bot : lire et modifier ses commandes, ses workflows et ses variables, et publier une commande sur Discord quand vous le décidez. C'est une API REST JSON classique sous `/v1`, authentifiée par une clé API que vous créez dans le Studio.

**Un abonnement Premium actif est nécessaire.** Créer ou renouveler une clé exige Premium. Si Premium se termine, vos clés sont conservées mais tous les appels répondent `403 key_suspended` jusqu'au retour de Premium. Révoquer une clé n'exige jamais Premium.

## Ce que vous pouvez faire

- Lire un bot, ses commandes, ses workflows et ses variables.
- Créer, remplacer, modifier, supprimer et restaurer des commandes.
- Publier une commande sur Discord (globalement ou sur des serveurs choisis) et la retirer de Discord sans la supprimer de Bot Creator.
- Créer, remplacer et supprimer des workflows.
- Lire, écrire et supprimer des valeurs de variables.

Démarrer et arrêter le bot, les journaux d'exécution, les statistiques, les déclencheurs et les webhooks ne sont **pas** encore dans l'API.

## URL de base

```
https://api.bot-creator.fr
```

Le contrat OpenAPI 3.1 complet est servi sans authentification sur `https://api.bot-creator.fr/v1/openapi.json`. La [référence des routes]({{ '/fr/docs/public-api-reference/' | relative_url }}) les liste toutes.

## Créer une clé API

Les clés API se gèrent dans le [Studio]({% include studio_link.html at='public_api_docs_fr' %}), pas dans l'application mobile.

1. Ouvrez votre bot dans le Studio et choisissez l'onglet **Clés API** du groupe Gestion, à côté d'Équipe et de Serveurs.
2. Choisissez un nom, les permissions (scopes) nécessaires et une durée de validité.
3. Copiez la clé. **Elle n'est affichée qu'une fois.** Bot Creator n'en garde qu'une empreinte : une clé perdue ne peut pas être retrouvée, seulement remplacée.

Une clé ressemble à `bcm_k_<8 caractères>_<43 caractères>`. Traitez-la comme un mot de passe : variable d'environnement ou gestionnaire de secrets, jamais dans un dépôt ni dans du code côté client.

**Une clé appartient à un seul bot.** Demander un autre bot répond `404 bot_not_found`, exactement comme s'il n'existait pas. Chaque appel est aussi comparé aux droits du compte qui a créé la clé (propriétaire, ou collaborateur autorisé à modifier) : si ce compte perd l'accès au bot, la clé ne marche plus dessus.

Vous pouvez avoir jusqu'à 5 clés actives par bot et par compte. Le Studio n'affiche que les clés que **vous** avez créées : un propriétaire ne voit pas les clés de ses collaborateurs.

### Expiration

Dans le Studio, vous choisissez 30 jours, 90 jours (recommandé), 1 an ou jamais. L'API accepte elle-même de 1 à 365 jours, et 90 jours quand rien n'est précisé. Une clé qui n'expire jamais reste valable jusqu'à sa révocation, ce que nous déconseillons. Une clé expirée répond `401 key_expired`.

### Rotation et révocation

- **Renouveler** crée une nouvelle clé et laisse l'ancienne fonctionner pendant un délai de grâce (dans le Studio : aucun, 24 heures, 3 jours ou 7 jours ; l'API accepte de 0 à 168 heures, 24 par défaut), pour déployer la nouvelle sans coupure.
- **Révoquer** est immédiat et irréversible. Une clé révoquée est refusée en 10 secondes au plus sur tous les serveurs.

Les routes de gestion ne sont disponibles que depuis une session de compte du Studio. Une clé ne peut ni créer, ni renouveler, ni révoquer de clé, et elle est refusée partout en dehors de `/v1`.

## S'authentifier

Envoyez la clé comme jeton Bearer :

```bash
curl -H "Authorization: Bearer $BCM_KEY" \
  https://api.bot-creator.fr/v1/bot
```

`GET /v1/bot` renvoie le bot de la clé, sans que vous ayez besoin de connaître son identifiant. Le même bot est disponible sur `/v1/bots/{botId}`.

## Permissions (scopes)

Donnez à chaque clé uniquement ce dont elle a besoin.

| Permission | Autorise | Risque |
|---|---|---|
| `read:bots` | Lire le bot, les commandes, les workflows, les variables, l'historique et l'état de publication | Faible |
| `write:commands` | Créer, remplacer, modifier, supprimer et restaurer des commandes | Moyen |
| `publish:commands` | Publier des commandes sur Discord et les en retirer | Élevé |
| `write:workflows` | Créer, remplacer et supprimer des workflows | Moyen |
| `write:settings` | Écrire et supprimer des valeurs de variables | Moyen |

Une permission manquante répond `403 missing_scope`, et `details.required_scope` nomme celle à ajouter. Deux points à connaître :

- Modifier une commande **déjà publiée** met aussi à jour sa copie chez Discord, même avec `write:commands` seul. Supprimer une commande publiée la retire de Discord.
- Demander un enregistrement Discord (`global` ou `guilds`) dans le corps d'une écriture exige `publish:commands`.

## Commandes et Discord

Une commande créée par l'API n'est **pas publiée sur Discord**. Sauf demande contraire, elle est enregistrée dans Bot Creator avec l'enregistrement `none`. La publication est une étape à part, qui exige la permission `publish:commands`.

```bash
BASE=https://api.bot-creator.fr/v1/bots/$BOT

# 1. Créer la commande (pas encore sur Discord)
curl -X POST "$BASE/commands" \
  -H "Authorization: Bearer $BCM_KEY" -H "Content-Type: application/json" \
  -d '{"command":{"id":"salut","name":"salut","response":"Salut !"}}'

# 2. La publier sur un serveur
curl -X POST "$BASE/commands/salut/publication" \
  -H "Authorization: Bearer $BCM_KEY" -H "Content-Type: application/json" \
  -d '{"registration":"guilds","guild_ids":["123456789012345678"]}'

# 3. La retirer de Discord, en la gardant dans Bot Creator
curl -X DELETE "$BASE/commands/salut/publication" \
  -H "Authorization: Bearer $BCM_KEY"
```

L'état de publication d'une commande vaut `local`, `published`, `out_of_sync`, `unpublished`, `error` ou `unknown`. Listez les commandes dans un état donné avec `GET /commands?state=out_of_sync`. Si Discord refuse une publication, l'API répond `502 discord_error`, met la raison dans `details` et laisse l'état inchangé.

La forme exacte d'une commande est celle de l'éditeur. Le plus simple pour l'apprendre est de faire `GET /commands/{id}` sur une commande créée dans le Studio.

### Contrôles côté serveur

Le serveur compile chaque commande et chaque workflow à l'écriture. Une erreur répond `422 validation_failed` avec la liste des problèmes dans `details`, et rien n'est enregistré. Les avertissements reviennent dans `compile.warnings` de la réponse.

### Modifier une partie d'une commande

`PATCH /commands/{id}` prend un patch de fusion JSON (RFC 7386) : les champs envoyés remplacent les existants, `null` supprime un champ, et les tableaux sont remplacés en entier.

```bash
curl -X PATCH "$BASE/commands/salut" \
  -H "Authorization: Bearer $BCM_KEY" -H "Content-Type: application/json" \
  -d '{"command":{"response":"Salut tout le monde !"}}'
```

### Historique

Chaque commande garde ses 5 dernières versions. `GET /commands/{id}/history` les liste et `POST /commands/{id}/rollback/{historyId}` en restaure une.

## Variables

Une variable a une portée : `global`, `user`, `guild`, `channel` ou `guildMember`.

```bash
# écrire une variable globale
curl -X PUT "$BASE/variables/global/saison" \
  -H "Authorization: Bearer $BCM_KEY" -H "Content-Type: application/json" \
  -d '{"value":"7"}'

# lire la valeur d'une variable de serveur pour un serveur
curl -H "Authorization: Bearer $BCM_KEY" \
  "$BASE/variables/guild/salon_bienvenue?scope_id=123456789012345678"
```

Pour une valeur précise, passez `scope_id` (et `scope_aux_id` quand la portée demande deux identifiants). Sans eux, la route liste les valeurs enregistrées. Les variables dont le nom ressemble à un secret sont masquées dans les listes. Écrire une variable sans définition crée la définition pour vous. Supprimer retire la valeur et garde la définition.

## Pagination

Les listes répondent `{ "items": [...], "next_cursor": "..." }`. Repassez `next_cursor` dans le paramètre `cursor` pour obtenir la page suivante ; il vaut `null` sur la dernière page. Les commandes acceptent `limit` de 1 à 100 (50 par défaut). Les curseurs sont opaques : ne les fabriquez pas et ne les décodez pas.

## Limites

| Limite | Valeur par défaut |
|---|---|
| Clés actives par bot et par compte | 5 |
| Lectures par minute, par clé | 600 |
| Écritures par minute, par clé | 60 |
| Essais de clé invalide par minute, par adresse IP | 30 |

Ces valeurs de départ pourront être ajustées quand l'usage réel aura été mesuré. Chaque réponse authentifiée porte `X-RateLimit-Limit` et `X-RateLimit-Remaining`. Au-delà de la limite, l'API répond `429 rate_limited` avec `Retry-After` (secondes) et `X-RateLimit-Reset` : attendez ce délai avant de réessayer. Les compteurs sont tenus par instance du serveur, la limite réelle peut donc être plus haute que ce chiffre quand plusieurs instances servent vos appels.

## Erreurs

Toute erreur est en JSON :

```json
{
  "code": "missing_scope",
  "message": "This key does not have the scope publish:commands.",
  "details": { "required_scope": "publish:commands" },
  "request_id": "..."
}
```

Appuyez-vous sur `code`, qui est stable, et pas sur `message`. Citez `request_id` si vous contactez le support.

| Statut | Codes |
|---|---|
| 400 | `invalid_payload`, `invalid_pagination`, `invalid_state`, `precondition_unsupported` |
| 401 | `invalid_authorization`, `invalid_key`, `key_revoked`, `key_expired` |
| 403 | `missing_scope`, `key_suspended` (Premium terminé ou compte bloqué) |
| 404 | `bot_not_found`, `bot_command_not_found`, `bot_workflow_not_found` |
| 409 | `already_exists` |
| 422 | `validation_failed`, `bot_setting_invalid` |
| 429 | `rate_limited` |
| 502 | `discord_error` |
| 503 | `audit_unavailable`, `auth_unavailable` |

## À savoir

- **Le dernier qui écrit gagne.** Deux écritures sur la même commande s'écrasent. Le champ `revision` des réponses est informatif. `If-Match` et `If-None-Match` sont refusés avec `400 precondition_unsupported` au lieu d'être ignorés en silence.
- **Une modification peut être enregistrée sans atteindre le bot en cours d'exécution.** Les réponses d'écriture portent `runner_synced`. Quand il vaut `false`, la modification est enregistrée mais pas encore active : lisez `runner_sync_reason` et `next_step`.
- **Chaque écriture est journalisée.** Les écritures sont tracées par clé. Si ce journal ne peut pas être écrit, l'appel répond `503 audit_unavailable` et rien n'est modifié.
- **Les jetons de bot ne sont jamais renvoyés.** L'API n'expose jamais le jeton Discord de votre bot.

## Versions

`/v1` ne reçoit que des ajouts compatibles : nouveaux champs et nouvelles routes. Ignorez les champs que vous ne connaissez pas. Un changement incompatible sortirait en `/v2`, avec `/v1` conservé au moins 6 mois et des en-têtes `Deprecation` et `Sunset` sur les anciennes routes.
