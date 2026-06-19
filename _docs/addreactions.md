---
layout: doc
title: $addReactions
translation_key: docs
category: "Moderation"
function_name: addReactions
syntax: $addReactions[emoji1;emoji2;...]
description: Adds an or multiple réactions au message de response of the bot (the message sent par la command in progress). The emojis are added séquentiellement.
---

# $addReactions

The `$addReactions[]` function **ajouter of reactions** au message de response sent par the bot in the command in progress.

## Syntax

```
$addReactions[emoji1;emoji2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `emoji1;emoji2;...` | List d'emojis separateds par `;`. Supporte les emojis Unicode and customs. |

## Return value

Cette function does not return a value. The réactions sont ajoutées au message de response of the bot.

## Behavior

- Les réactions sont ajoutées in the order spécifié.
- The bot must have the permission `ADD_REACTIONS` in the channel.
- Les emojis customs must be accessibles au bot (présents sur a server commun).
- If a emoji est invalid, les réactions nextes peuvent not être ajoutées.

## Examples

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

- `$addReactions[]` s'applique au message de response of the bot (celui sent par `$sendMessage[]`).
- Pour ajouter of reactions au message de command of the user, use `$addCmdReactions[]`.
- Pour of messages spécifiques, use `$addMessageReactions[]`.
