---
layout: doc
title: $customEmoji
translation_key: docs
category: "Moderation"
function_name: customEmoji
syntax: $customEmoji[name;(id)]
description: Generates the markup of a custom emoji in the format <:name:ID> for display in a message. If the ID is omitted, the bot searches for the emoji on the current server.
---

# $customEmoji

The `$customEmoji[]` function **generates the markup of a custom emoji** usable in a message or an embed. It returns the format `<:name:ID>` which will be rendered as an emoji by Discord.

## Syntax

```
$customEmoji[name;(id)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | The custom emoji name. |
| `id` | Optional - The ID of the emoji. If omitted, it is searched for on the server by name. |

## Return value

- **Type**: String
- The markup `<:name:ID>` (or `<a:name:ID>` for animated ones) displayable in Discord.
- Empty string or text name if the emoji is not found.

## Behavior

- Without an ID, the function searches for the emoji by name on the current server.
- With an ID, it directly generates the markup.
- Animated emojis are automatically detected and formatted with `<a:...>`.

## Examples

## Simple display

```bdfd
$title[Welcome!]
$description[
$customEmoji[wave] Welcome to the server $customEmoji[party]!
]
$sendMessage[]
```

### With explicit ID

```bdfd
$let[emoji;$customEmoji[boost;123456789012345678]]
$title[🚀 Boost detected $emoji]
$description[Thank you for your boost!]
$color[#F47FFF]
$sendMessage[]
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
$sendMessage[]
```

### Conditional emoji

```bdfd
$if[$emojiExists[verified]==true]
  $customEmoji[verified]
$else
  ✅
$endif Verified User
```

## Notes

- If the emoji does not exist on the server and no ID is provided, the markup will not display correctly.
- For emojis from other servers, the ID is required.
- The bot must have access to the server hosting the emoji to resolve it by name.
