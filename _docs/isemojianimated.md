---
layout: doc
title: $isEmojiAnimated
translation_key: docs
category: "Math & Text"
function_name: isEmojiAnimated
syntax: $isEmojiAnimated[emoji]
description: Checks if a custom emoji is animated.
---

# $isEmojiAnimated

The function `$isEmojiAnimated[emoji]` **checks if a custom emoji is animated**. Discord animated emojis start with `<a:` instead of `<:`.

## Syntax

```
$isEmojiAnimated[emoji]
```

## Parameters

| Parameter | Description |
|---|---|
| `emoji` | The emoji to test, in its Discord form (`<:name:id>` or `<a:name:id>`). |

## Return Value

- **Type**: Boolean
- `true` if the emoji is animated.
- `false` if the emoji is static, standard (Unicode), or invalid.

## Behavior

- Works only with Discord custom emojis.
- Standard Unicode emojis (😀, 🎉) return `false`.
- The expected format is the full emoji mention.

## Examples

### Emoji Check

```bdfd
$var[emoji;$message[1]]
$if[$isEmojiAnimated[$var[emoji]]==true]
  $sendMessage[🎞️ $var[emoji] is an animated emoji!]
$else
  $sendMessage[🖼️ $var[emoji] is a static or standard emoji.]
$endif
```

### Emoji Statistics

```bdfd
$title[📊 Emoji Info]
$description[
**Emoji:** $message[1]
**Animated:** $if[$isEmojiAnimated[$message[1]]==true]Yes$elseNo$endif
**Name:** $emojiName[$message[1]]
**ID:** $emojiID[$message[1]]
]
$sendMessage[]
```

### Filter Animated Emojis

```bdfd
$var[emoji;$message[1]]
$if[$isEmojiAnimated[$var[emoji]]==true]
  $sendMessage[✅ Animated emoji detected!]
  $sendMessage[$var[emoji]]
$else
  $sendMessage[❌ Only animated emojis are allowed in this command.]
$endif
```

## Notes

- Animated format: `<a:name:id>` → `true`.
- Static format: `<:name:id>` → `false`.
- Unicode emoji: `😀` → `false`.
- To get the name of an emoji, use `$emojiName[]`.
- To get the ID of an emoji, use `$emojiID[]`.
