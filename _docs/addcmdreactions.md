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

The `$addCmdReactions[]` function **adds reactions directly to the user's message** that triggered the command.

## Syntax

```
$addCmdReactions[emoji1;emoji2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `emoji1;emoji2;...` | List of emojis separated by `;`. Supports Unicode and custom emojis. |

## Return value

This function does not return a value. The reactions are added to the command message.

## Behavior

- Unlike `$addReactions[]`, this function targets the **trigger** message (the user's message).
- Useful for giving quick visual feedback without sending a message.
- The bot must have the permission `ADD_REACTIONS` in the channel.

## Examples

### Simple feedback

```bdfd
$addCmdReactions[✅]
$suppressErrors[Action completed.]
```

### Conditional feedback

```bdfd
$if[$checkContains[$userPerms;Administrator]==true]
  $addCmdReactions[✅]
  $ban[$mentioned[1]]
$else
  $addCmdReactions[❌]
  $ephemeral[You do not have permission.]
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

- `$addCmdReactions[]` only works if the trigger message still exists.
- Does not require sending a response message.
- Ideal for quick commands where a simple emoji is enough for confirmation.

