---
layout: doc
title: $byteCount
translation_key: docs
category: "Entity Info"
function_name: byteCount
syntax: $byteCount[text]
description: Calculates and returns the number of bytes of a text string. Useful for checking the size of a message before sending.
---

# $byteCount

The `$byteCount[]` function **calculates the number of bytes** of a given text. Useful for checking Discord message size limits or evaluating data size.

## Syntax

```
$byteCount[text]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | The text of which you want to know the size in bytes. |

## Return value

- **Type**: String (number)
- The number of bytes that the text represents.

## Behavior

- Counts bytes, not characters (a Unicode character can be multiple bytes).
- ASCII characters count as 1 byte, while emojis and accented characters count for more.
- Useful for validating data before storage or sending.

## Examples

### Checking before sending

```bdfd
$let[size;$byteCount[$message]]
$if[$size>2000]
  $sendMessage[⚠️ Message too long ($size bytes). Discord limit: 2000 characters.]
$else
  $sendMessage[$message]
$endif
```

### Checking stored data

```bdfd
$let[data;$getVar[userData]]
$let[size;$byteCount[$data]]

$title[📦 User Data]
$description[
**Size:** $size bytes ($math[$size/1024] KB)
**Number of characters:** $length[$data]
]
$sendMessage[]
```

### Size comparison

```bdfd
$let[ascii;$byteCount[Hello World]]
$let[unicode;$byteCount[Héllö Wörld]]
$let[emoji;$byteCount[Hello 👋]]

ASCII: $ascii bytes
Unicode (accents): $unicode bytes
With emoji: $emoji bytes
```

## Notes

- `$byteCount` differs from `$length`: `$length` counts characters, `$byteCount` counts bytes.
- With pure ASCII text, both values are identical.
- Discord limits messages to 2000 characters (not bytes), but this function remains useful for storage calculations.
