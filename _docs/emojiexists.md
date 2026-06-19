---
layout: doc
title: $emojiExists
translation_key: docs
category: "Moderation"
function_name: emojiExists
syntax: $emojiExists[name]
description: Checks if a custom emoji with a given name exists on the current server. Returns true or false.
---

# $emojiExists

The `$emojiExists` function **checks if a custom emoji exists** on the current server.

## Syntax

```
$emojiExists[name]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | The emoji name to check (without colons, e.g. `:name:`). |

## Return value

- **Type**: String (boolean)
- `true` if an emoji with this name exists on the server.
- `false` if no emoji with this name is found.

## Behavior

- The search is case-sensitive.
- Checks only the emojis of the current server.
- Useful as a check/guard before using emoji actions.

## Examples

### Before deletion

```bdfd
$if[$emojiExists[$noMentionMessage]==true]
  $removeEmoji[$noMentionMessage]
  $sendMessage[✅ Emoji **$noMentionMessage** deleted.]
$else
  $sendMessage[❌ The emoji **$noMentionMessage** does not exist.]
$endif
```

### Before creation

```bdfd
$let[name;$noMentionMessage]
$if[$emojiExists[$name]==true]
  $sendMessage[❌ An emoji named **$name** already exists.]
$else
  $let[url;$getAttachments[$noMentionMessage]]
  $if[$url!=]
    $addEmoji[$name;$url]
    $sendMessage[✅ Emoji **$name** created !]
  $else
    $sendMessage[❌ Please attach an image.]
  $endif
$endif
```

### Verification in a message

```bdfd
$if[$emojiExists[$message]==true]
  ✅ The emoji **$message** is available.
  $customEmoji[$message]
$else
  ❌ The emoji **$message** does not exist. Import it with `!addemoji $message`.
$endif
```

## Notes

- The name is case-sensitive: `Cool` ≠ `cool`.
- Only checks emojis of the current server.
- For external emojis, use `$emojiName[]` which returns empty if inaccessible.
