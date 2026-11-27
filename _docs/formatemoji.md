---
layout: doc
title: $formatEmoji[]
translation_key: docs
category: "Moderation"
function_name: formatEmoji
syntax: $formatEmoji[emojiID]
description: "Returns a custom emoji ready to send in a message, from its ID."
---
# $formatEmoji — Returns a custom emoji ready to send in a message, from its ID

## Syntax

```
$formatEmoji[emojiID]
```

## Parameters

| Parameter | Description |
|---|---|
| `emojiID` | The Discord ID of the emoji (the digits in `<:name:ID>`). Required; must be a positive number. |

## Return value

- **Type**: String
- `<:name:ID>` for a static emoji, `<a:name:ID>` for an animated one. It is the counterpart of `$customEmoji[name]`, which starts from the name.
- Errors (nothing is returned): `Invalid emoji ID.` if `emojiID` is not a positive number, and `Emoji not found.` if no accessible emoji has this ID.

## Behavior

- The emojis of the current server are searched first, then those of the other servers the bot is in.
- To avoid an error for an unknown ID, test it first with `$emojiExists[emojiID]`.

## Example

```bdfd
$if[$emojiExists[$message[1]]==true]
  $formatEmoji[$message[1]] This is the emoji.
$else
  Emoji not found.
$endif
```

## Notes

- Only works with custom emojis, not Unicode emojis.
