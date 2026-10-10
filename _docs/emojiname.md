---
layout: doc
title: $emojiName
translation_key: docs
category: "Moderation"
function_name: emojiName
syntax: $emojiName[emojiID]
description: Gets the name of a custom emoji from its ID. Returns the name text of the emoji.
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
| `emojiID` | The Discord ID of the emoji (the digits in `<:name:ID>`). |

## Return value

- **Type**: String
- The name of the custom emoji.
- An empty string if the emoji does not exist or is not accessible.

## Behavior

- Extracts the name from the emoji's ID.
- Works for emojis from any server that the bot has access to.
- The ID can be extracted from a message containing the emoji.

## Examples

### Identification of emoji

```bdfd
$var[emojiID;$message[1]]
$var[name;$emojiName[$var[emojiID]]]
$if[$var[name]!=]
  Emoji detected: **$var[name]** (ID: $var[emojiID])
$else
  Emoji not found.
$endif
```

### Log of emojis used

```bdfd
$var[id;$message[1]]
$if[$var[id]!=]
  $sendMessage[$channelID[logs];📊 Emoji **$emojiName[$var[id]]** used by $userName in $channelName[$channelID].]
$endif
```

### List of emojis

```bdfd
$title[📋 Server Emojis]
$description[$serverEmojis[$guildID;, ]]
```

## Notes

- Only works with custom emojis, not Unicode emojis.
- The emoji must be on a server that the bot has access to.
- Useful for logs and emoji usage statistics.
