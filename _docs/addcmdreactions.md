---
layout: doc
title: $addCmdReactions
translation_key: docs
category: "Moderation"
function_name: addCmdReactions
syntax: $addCmdReactions[emoji1;emoji2;...]
description: Adds an or multiple réactions au message de command of the user (the message qui a déclenché la command).
---

# $addCmdReactions

The `$addCmdReactions[]` function **ajouter of reactions directly au message of the user** qui a déclenché la command.

## Syntax

```
$addCmdReactions[emoji1;emoji2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `emoji1;emoji2;...` | List d'emojis separateds par `;`. Supporte les emojis Unicode and customs. |

## Return value

Cette function does not return a value. The réactions sont ajoutées au message de command.

## Behavior

- Contrairement à `$addReactions[]`, cette function cible the message **déclencheur** (message of the user).
- Utile pour donner un feedback visuel fast without envoyer de message.
- The bot must have the permission `ADD_REACTIONS` in the channel.

## Examples

### Sislow feedback

```bdfd
$addCmdReactions[✅]
$suppressErrors[Action effectuée.]
```

### Conditional feedback

```bdfd
$if[$checkContains[$userPerms;Administrator]==true]
  $addCmdReactions[✅]
  $ban[$mentioned[1]]
$else
  $addCmdReactions[❌]
  $ephemeral[Vous n'avez pas the permission.]
$endif
```

### Progress indicator

```bdfd
$addCmdReactions[⏳]
$wait[2]
$removeReaction[$channelID;$messageID;⏳]
$addCmdReactions[✅]
```

## Notes

- `$addCmdReactions[]` ne functionne que if the message déclencheur existe encore.
- Ne requires pas d'envoyer a message de response.
- Idéal for commands fasts où un simple emoji suffit comme confirmation.
