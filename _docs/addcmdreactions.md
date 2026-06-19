---
layout: doc
title: $addCmdReactions
translation_key: docs
category: "Moderation"
function_name: addCmdReactions
syntax: $addCmdReactions[emoji1;emoji2;...]
description: Adds one or more reactions to the user's command message (the message that triggered the command).
---

# $addCmdReactions

The `$addCmdReactions[]` function **ajouter of reactions directly to the user's message** qui triggered the command.

## Syntax

```
$addCmdReactions[emoji1;emoji2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `emoji1;emoji2;...` | List of emojis separateds par `;`. Supports thes emojis Unicode and customs. |

## Return value

Cette function does not return a value. The réactions sont ajoutées to the command message.

## Behavior

- Contrairement to `$addReactions[]`, cette function target the message **déclencheur** (user's message).
- Utile pour donner un feedback visual fast without envoyer of message.
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
- Ne requires pas of envoyer a message of response.
- Idéal for commands fasts où un simple emoji suffit like confirmation.
