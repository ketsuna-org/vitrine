---
layout: doc
title: $addReactions
translation_key: docs
category: "Moderation"
function_name: addReactions
syntax: $addReactions[emoji1;(emoji2);(...)]
description: Adds one or more reactions to the bot's response message (the message sent by the current command). The emojis are added sequentially.
---

# $addReactions

The `$addReactions[]` function **queues reactions** that are added to the message sent by the bot for the current command.

## Syntax

```
$addReactions[emoji1;(emoji2);(...)]
```

## Parameters

| Parameter | Description |
|---|---|
| `emoji1` | Required. At least one emoji is needed (`$addReactions` without brackets is refused). |
| `emoji2;...` | Optional. Any number of additional emojis, separated by `;`. |

An emoji can be a Unicode emoji, a custom emoji in the form `<:name:ID>` / `<a:name:ID>`, a numeric emoji ID, or a BDFD alias such as `:name:` (unknown aliases are an error). An empty argument or plain ASCII text is an error.

## Return value

Returns an empty string. The emojis are only queued: they are added once the response message has been sent, in the specified order. If the response is discarded, the queued reactions are discarded with it.

## Behavior

- The reactions target the message that the bot sends as the command response.
- The bot needs the Read Message History permission in the channel, and Add Reactions when an emoji is not already on the message ("Missing channel permissions for reactions.").
- If the sent response has no usable channel/message ID, the call fails with an error.
- If no reaction service is configured, the call fails with "No reaction service configured".

## Examples

### Reactions to a poll

```bdfd
$title[Poll]
$description[$message]
$addReactions[👍;👎;🤷]
```

### Confirmation reactions

```bdfd
$if[$checkContains[$message;!delete]==true]
  $title[Confirmation]
  $description[Are you sure you want to delete?]
  $addReactions[✅;❌]
$endif
```

### Reactions to an announcement

```bdfd
$title[📢 Announcement]
$description[$noMentionMessage]
$addReactions[📢;👀]
```

## Notes

- `$addReactions[]` applies to the response message of the bot.
- To add reactions to the user's command message, use `$addCmdReactions[]`.
- For specific messages, use `$addMessageReactions[]`.
