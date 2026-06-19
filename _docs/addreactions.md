---
layout: doc
title: $addReactions
translation_key: docs
category: "Moderation"
function_name: addReactions
syntax: $addReactions[emoji1;emoji2;...]
description: Ajoute une ou plusieurs réactions au message de réponse du bot (le message envoyé par la commande en cours). Les émojis sont ajoutés séquentiellement.
---

# $addReactions

La fonction `$addReactions[]` permet d'**ajouter des réactions** au message de réponse envoyé par le bot dans la commande en cours.

## Syntaxe

```
$addReactions[emoji1;emoji2;...]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `emoji1;emoji2;...` | Liste d'émojis séparés par `;`. Supporte les émojis Unicode et personnalisés. |

## Valeur de retour

Cette fonction ne retourne pas de valeur. Les réactions sont ajoutées au message de réponse du bot.

## Comportement

- Les réactions sont ajoutées dans l'ordre spécifié.
- Le bot doit avoir la permission `ADD_REACTIONS` dans le canal.
- Les émojis personnalisés doivent être accessibles au bot (présents sur un serveur commun).
- Si un émoji est invalide, les réactions suivantes peuvent ne pas être ajoutées.

## Exemples

### Réactions à un sondage

```bdfd
$title[Sondage]
$description[$message]
$addReactions[👍;👎;🤷]
$sendMessage[]
```

### Réactions de confirmation

```bdfd
$if[$checkContains[$message;!delete]==true]
  $title[Confirmation]
  $description[Êtes-vous sûr de vouloir supprimer ?]
  $addReactions[✅;❌]
  $sendMessage[]
$endif
```

### Réactions à une annonce

```bdfd
$title[📢 Annonce]
$description[$noMentionMessage]
$addReactions[📢;👀]
$sendMessage[]
```

## Notes

- `$addReactions[]` s'applique au message de réponse du bot (celui envoyé par `$sendMessage[]`).
- Pour ajouter des réactions au message de commande de l'utilisateur, utilisez `$addCmdReactions[]`.
- Pour des messages spécifiques, utilisez `$addMessageReactions[]`.
