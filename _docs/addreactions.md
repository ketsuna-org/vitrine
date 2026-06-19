---
layout: doc
title: $addReactions
translation_key: docs
category: "Moderation"
function_name: addReactions
syntax: $addReactions[emoji1;emoji2;...]
description: Adds one or more reactions to the message of response of the bot (the message sent par la command in progress). The emojis are added séquentiellement.
---

# $addReactions

The `$addReactions[]` function **ajouter of reactions** to the message of response sent par the bot in the command in progress.

## Syntax

```
$addReactions[emoji1;emoji2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `emoji1;emoji2;...` | List of emojis separateds par `;`. Supports thes emojis Unicode and customs. |

## Return value

Cette function does not return a value. The réactions sont ajoutées to the message of response of the bot.

## Behavior

- Les réactions sont ajoutées in the order spécifié.
- The bot must have the permission `ADD_REACTIONS` in the channel.
- Les emojis customs must be accessibles to the bot (présents on a server commun).
- If a emoji est invalid, les réactions nextes can not être ajoutées.

## Examples

### Réactions to un sondage

```bdfd
$title[Sondage]
$description[$message]
$addReactions[👍;👎;🤷]
$sendMessage[]
```

### Réactions of confirmation

```bdfd
$if[$checkContains[$message;!delete]==true]
  $title[Confirmation]
  $description[Êtes-vous sûr of vouloir supprimer ?]
  $addReactions[✅;❌]
  $sendMessage[]
$endif
```

### Réactions to une annonce

```bdfd
$title[📢 Annonce]
$description[$noMentionMessage]
$addReactions[📢;👀]
$sendMessage[]
```

## Notes

- `$addReactions[]` s'applique to the message of response of the bot (celui sent par `$sendMessage[]`).
- Pour ajouter of reactions to the user's command message, use `$addCmdReactions[]`.
- Pour of messages specifics, use `$addMessageReactions[]`.
