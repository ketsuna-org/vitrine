---
layout: doc
title: $customEmoji
translation_key: docs
category: "Moderation"
function_name: customEmoji
syntax: $customEmoji[name]
description: Returns the markup of a custom emoji in the format <:name:ID> for display in a message. The emoji is searched by name on the current server first, then on the other servers of the bot.
---

# $customEmoji

The `$customEmoji[]` function **looks up a custom emoji by name and returns its markup**, usable in a message or an embed. It returns the format `<:name:ID>` which will be rendered as an emoji by Discord.

## Syntax

```
$customEmoji[name]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | Required. The exact name of the custom emoji. An empty name raises `Emoji name is required.` |

## Return value

- **Type**: String
- The markup `<:name:ID>` (or `<a:name:ID>` for animated ones) displayable in Discord.
- An empty string if no emoji has this name.

## Behavior

- The function searches the emojis of the current server first, then those of the other servers the bot is in, and returns the first emoji with this exact name.
- Animated emojis are automatically detected and formatted with `<a:...>`.

## Examples

### Simple display

```bdfd
$title[Welcome!]
$description[
$customEmoji[wave] Welcome to the server $customEmoji[party]!
]
```

### Stored in a variable

```bdfd
$var[emoji;$customEmoji[boost]]
$title[🚀 Boost detected $var[emoji]]
$description[Thank you for your boost!]
$color[#F47FFF]
```

### Menu with emojis

```bdfd
$title[📋 Menu]
$description[
$customEmoji[rules] Rules
$customEmoji[announce] Announcements
$customEmoji[chat] General Discussion
]
$color[#5865F2]
```

### Conditional emoji

```bdfd
$if[$customEmoji[verified]!=]
  $customEmoji[verified]
$else
  ✅
$endif Verified User
```

## Notes

- If no emoji has this name, the function returns an empty string.
- Emojis from other servers are found only if the bot is in the server hosting them.
- Emoji functions that start from an ID are `$emojiName[emojiID]` and `$isEmojiAnimated[emojiID]`.
