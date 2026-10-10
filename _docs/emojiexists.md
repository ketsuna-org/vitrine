---
layout: doc
title: $emojiExists
translation_key: docs
category: "Moderation"
function_name: emojiExists
syntax: $emojiExists[emojiID]
description: Checks if a custom emoji with a given ID exists on the current server or on another server of the bot. Returns true or false.
---

# $emojiExists

The `$emojiExists` function **checks if a custom emoji exists**, from its **ID** (not its name).

## Syntax

```
$emojiExists[emojiID]
```

## Parameters

| Parameter | Description |
|---|---|
| `emojiID` | The numeric ID of the emoji (the digits in `<:name:ID>`). |

## Return value

- **Type**: String (boolean)
- `true` if an emoji with this ID is found.
- `false` if no emoji with this ID is found, **or if `emojiID` is not a positive number** (a name such as `cool` always gives `false`).

## Behavior

- The emojis of the current server are searched first, then those of the other servers the bot is in.
- Never raises an error for an invalid ID: it returns `false`.
- To look an emoji up by name, use `$customEmoji[name]` (it returns the emoji markup, or an empty string).

## Examples

### Before deletion

```bdfd
$if[$emojiExists[$message[1]]==true]
  $removeEmoji[$message[1]]
  $sendMessage[✅ Emoji **$message[1]** deleted.]
$else
  $sendMessage[❌ No emoji has the ID **$message[1]**.]
$endif
```

### Check by name with $customEmoji

```bdfd
$if[$customEmoji[$message]!=]
  ✅ The emoji **$message** is available: $customEmoji[$message]
$else
  ❌ The emoji **$message** does not exist.
$endif
```

## Notes

- The argument is an ID. Passing a name returns `false`.
- To create an emoji, see `$addEmoji[name;url;returnEmoji]`.
