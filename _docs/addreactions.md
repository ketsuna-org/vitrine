---
layout: doc
title: $addReactions
translation_key: docs
category: "Moderation"
function_name: addReactions
syntax: $addReactions[emoji1;emoji2;...]
description: Adds one or more reactions to the bot's response message (the message sent by the current command). The emojis are added sequentially.
---

# $addReactions

The `$addReactions[]` function **adds reactions** to the response message sent by the bot in the current command.

## Syntax

```
$addReactions[emoji1;emoji2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `emoji1;emoji2;...` | List of emojis separated by `;`. Supports Unicode and custom emojis. |

## Return value

This function does not return a value. The reactions are added to the bot's response message.

## Behavior

- Reactions are added in the specified order.
- The bot must have the permission `ADD_REACTIONS` in the channel.
- Custom emojis must be accessible to the bot (present on a shared server).
- If an emoji is invalid, subsequent reactions may not be added.

## Examples

### Reactions to a poll

```bdfd
$title[Poll]
$description[$message]
$addReactions[👍;👎;🤷]
$sendMessage[]
```

### Confirmation reactions

```bdfd
$if[$checkContains[$message;!delete]==true]
  $title[Confirmation]
  $description[Are you sure you want to delete?]
  $addReactions[✅;❌]
  $sendMessage[]
$endif
```

### Reactions to an announcement

```bdfd
$title[📢 Announcement]
$description[$noMentionMessage]
$addReactions[📢;👀]
$sendMessage[]
```

## Notes

- `$addReactions[]` applies to the response message of the bot (the one sent by `$sendMessage[]`).
- To add reactions to the user's command message, use `$addCmdReactions[]`.
- For specific messages, use `$addMessageReactions[]`.

