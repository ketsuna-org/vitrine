---
layout: doc
title: $addCmdReactions
translation_key: docs
category: "Moderation"
function_name: addCmdReactions
syntax: $addCmdReactions[emoji1;(emoji2);(...)]
description: Adds one or more reactions to the user's command message (the message that triggered the command).
---

# $addCmdReactions

The `$addCmdReactions[]` function **adds reactions directly to the user's message** that triggered the command.

## Syntax

```
$addCmdReactions[emoji1;(emoji2);(...)]
```

## Parameters

| Parameter | Description |
|---|---|
| `emoji1` | Required. At least one emoji is needed (`$addCmdReactions` without brackets is refused). |
| `emoji2;...` | Optional. Any number of additional emojis, separated by `;`. |

An emoji can be a Unicode emoji, a custom emoji in the form `<:name:ID>` / `<a:name:ID>`, a numeric emoji ID, or a BDFD alias such as `:name:` (unknown aliases are an error). An empty argument or plain ASCII text is an error.

## Return value

Returns an empty string. The reactions are added immediately to the command message (the message identified by the `message.id` variable in the channel `channel.id`).

## Behavior

- Unlike `$addReactions[]`, which waits for the bot's response to be sent, this function targets the **trigger** message (the user's message) at the moment it runs.
- If the channel or message ID is not available in the execution context, the call fails with an invalid-ID error.
- Useful for giving quick visual feedback without sending a message.

## Examples

### Simple feedback

```bdfd
$addCmdReactions[✅]
$suppressErrors[Action completed.]
```

### Conditional feedback

```bdfd
$if[$checkContains[$message;yes]==true]
  $addCmdReactions[✅]
$else
  $addCmdReactions[❌]
$endif
```

### Progress indicator

```bdfd
$addCmdReactions[⏳]
$wait[2]
$removeReaction[$channelID;$messageID;$authorID;⏳]
$addCmdReactions[✅]
```

## Notes

- Does not require sending a response message.
- Ideal for quick commands where a simple emoji is enough for confirmation.
