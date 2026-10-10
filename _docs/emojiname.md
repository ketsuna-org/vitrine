---
layout: doc
title: $emojiName
translation_key: docs
category: "Moderation"
function_name: emojiName
syntax: $emojiName[emojiID]
description: Gets the name of a custom emoji from its ID.
---

# $emojiName

The `$emojiName[]` function **retrieves the name of a custom emoji** from its Discord ID.

## Syntax

```
$emojiName[emojiID]
```

## Parameters

| Parameter | Description |
|---|---|
| `emojiID` | The Discord ID of the emoji (the digits in `<:name:ID>`). Required; must be a positive number. |

## Return value

- **Type**: String
- The name of the custom emoji, without colons.
- Errors (nothing is returned): `Invalid emoji ID.` if `emojiID` is not a positive number, and `Emoji not found.` if no accessible emoji has this ID.

## Behavior

- The emojis of the current server are searched first, then those of the other servers the bot is in.
- To avoid an error for an unknown ID, test it first with `$emojiExists[emojiID]`.

## Examples

### Identification of emoji

```bdfd
$if[$emojiExists[$message[1]]==true]
  Emoji detected: **$emojiName[$message[1]]** (ID: $message[1])
$else
  Emoji not found.
$endif
```

### List of emojis

```bdfd
$title[📋 Server Emojis]
$description[$serverEmojis[$guildID;, ]]
```

## Notes

- Only works with custom emojis, not Unicode emojis.
- The emoji must be on a server the bot is in.
