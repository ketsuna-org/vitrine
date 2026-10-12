---
layout: doc
title: Événements et variables
category: "Général"
category_key: "Meta"
api_type: general
description: "Comment fonctionnent les workflows pilotés par les événements et les variables ((...)) dans les bots Bot Creator."
locale: fr
lang: fr
content_language: fr
translation_key: doc-events-and-placeholders
permalink: /fr/docs/events-and-placeholders/
sidebar_context: docs_fr
---

Les bots Bot Creator réagissent aux événements Discord (messages, arrivées de membres, clics sur des boutons) et résolvent des valeurs dynamiques grâce au système de modèles `((...))`.

## Workflows pilotés par les événements

Les commandes ne sont pas le seul point d'entrée. Vous pouvez associer de la logique à des événements Discord tels que :

| Famille d'événements | Usage typique |
|--------------|-------------|
| `messageCreate` | Modération automatique, déclencheurs par mot-clé |
| `guildMemberAdd` | Messages de bienvenue, rôles automatiques |
| `interactionCreate` | Boutons, menus de sélection, modals, commandes slash |
| `voiceStateUpdate` | Journalisation des salons vocaux |

Chaque workflow d'événement s'exécute avec les variables de son propre événement (par exemple, les événements d'interaction définissent `interaction.kind` et `interaction.customId`).

## Variables `((...))`

Les variables insèrent des valeurs d'exécution dans les messages de réponse, les embeds, les composants et les entrées de workflow des blocs et des réponses visuelles. Elles sont résolues lorsque le bot s'exécute, et non au moment de la conception.

```text
Welcome ((user.username))! You joined ((guild.name)).
```

> **Le texte BDScript n'est pas résolu.** Le résolveur `((...))` n'est pas appliqué au texte d'un script BDFD natif (vérification : `Hi ((date))` est renvoyé inchangé). Dans un script BDFD, utilisez les `$functions`, par exemple `$username` et `$serverName`.

### Principales familles de variables

| Préfixe | Exemples |
|--------|----------|
| `((user.*))` | `((user.id))`, `((user.username))`, `((user.avatar))` |
| `((member.*))` | `((member.nick))`, `((member.joinedAt))`, `((member.roles))` |
| `((guild.*))` | `((guild.name))`, `((guild.memberCount))` |
| `((channel.*))` | `((channel.id))`, `((channel.name))` |
| `((message.*))` | `((message.content))`, `((message.id))` |
| `((interaction.*))` | `((interaction.customId))`, `((interaction.kind))` |
| `((opts.*))` | `((opts.reason))`, `((opts.target.id))` (options de commande slash : pour les options de type utilisateur, salon, rôle et mentionnable, l'ID est `opts.<name>.id` ; les champs de modal sont aussi stockés sous `opts.<key>`) |

## Variables d'interaction

Lorsqu'un utilisateur clique sur un bouton ou envoie un modal, les variables d'interaction sont renseignées automatiquement.

**BDScript (BDFD)** lit l'ID personnalisé avec `$customID` (valide dans une interaction de composant ou de modal) :
```bdfd
$ephemeral
Clicked: $customID
```

**Blocs :**
```json
{
  "type": "respondWithMessage",
  "payload": {
    "content": "Clicked: ((interaction.customId))",
    "ephemeral": true
  }
}
```

Consultez [Interactions overview](/docs/interactions-overview/) (en anglais) pour les schémas propres à chaque composant.

## Référence complète

| Ressource | Portée |
|----------|-------|
| [Template system](/docs/template-system/) | Syntaxe complète de `((...))`, valeurs de repli, JSONPath, fonctions en ligne |
| [Exhaustive event variables guide](/reference-deployment/2026/05/22/available-variables-per-event-exhaustive/) | Toutes les variables pour chaque type d'événement |
| [JavaScript placeholders](/docs/javascript/placeholders/) | Utilisation des schémas `((...))` en BDJS |

## BDScript et JavaScript

- **BDScript :** utilisez les `$functions` ; le texte `((...))` à l'intérieur d'un script BDFD est laissé tel qu'il a été saisi.
- **JavaScript :** consultez [variables](/docs/javascript/variables/) et [placeholders](/docs/javascript/placeholders/).

## Étapes suivantes

1. Variables persistantes (`$getUserVar`, `$setUserVar`) : consultez le [Database variables guide](/advanced-topics/2026/05/30/mastering-persistent-database-variables-in-bdfd/).
2. Créez votre premier workflow d'événement avec [Create Your First Command](/getting-started/2026/03/12/how-to-create-a-command-in-bot-creator-step-by-step/).
