---
layout: doc
title: $isEmojiAnimated
translation_key: docs
category: "Math & Text"
function_name: isEmojiAnimated
syntax: $isEmojiAnimated[emojiID]
description: Checks if a custom emoji, given by its ID, is animated.
---

# $isEmojiAnimated

The function `$isEmojiAnimated[emojiID]` **checks if a custom emoji is animated**. The emoji is identified by its numeric **ID**, not by its `<:name:id>` mention.

## Syntax

```
$isEmojiAnimated[emojiID]
```

## Parameters

| Parameter | Description |
|---|---|
| `emojiID` | Required, exactly one argument. The ID of a custom emoji: digits only (surrounding spaces are ignored). Anything else, including a `<:name:id>` mention, a name or a Unicode emoji, raises the error "Invalid emoji ID.". |

## Return Value

- **Type**: Boolean
- `"true"` if the emoji is animated.
- `"false"` if the emoji is static.
- If no emoji with this ID is found, the command stops with the error "Emoji not found.": the function does not return `false` in that case.

## Behavior

- The emoji is looked up among the custom emojis of the current server first, then among the servers the bot is in.
- Unicode emojis (😀, 🎉) have no ID and cannot be tested: they raise "Invalid emoji ID.".
- The reported value comes from Discord's data for the emoji (its animated flag), which is the `a` in `<a:name:id>`.

## Examples

### Emoji Check

```bdfd
$var[emoji;$message[1]]
$if[$isEmojiAnimated[$var[emoji]]==true]
  $sendMessage[🎞️ The emoji $var[emoji] is animated!]
$else
  $sendMessage[🖼️ The emoji $var[emoji] is static.]
$endif
```

Here the user types the ID of the emoji as the first argument.

### Emoji Statistics

```bdfd
$if[$isEmojiAnimated[$message[1]]==true]
  $var[animated;Yes]
$else
  $var[animated;No]
$endif
$title[📊 Emoji Info]
$description[
**Emoji ID:** $message[1]
**Animated:** $var[animated]
**Name:** $emojiName[$message[1]]
]
```

## Notes

- To get the name of an emoji from its ID, use `$emojiName[]`.
- To test whether an emoji ID exists first, use `$emojiExists[]`, which returns `false` for an unknown ID instead of failing.
