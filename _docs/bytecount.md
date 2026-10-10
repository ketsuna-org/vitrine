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
$var[size;$byteCount[$message]]
$if[$var[size]>2000]
  $sendMessage[⚠️ Message too long ($var[size] bytes). Discord limit: 2000 characters.]
$else
  $sendMessage[$message]
$endif
```

### Checking stored data

```bdfd
$var[data;$getVar[userData]]
$var[size;$byteCount[$var[data]]]

$title[📦 User Data]
$description[
**Size:** $var[size] bytes ($calculate[$var[size]/1024] KB)
**Number of characters:** $charCount[$var[data]]
]
```

### Size comparison

```bdfd
$var[ascii;$byteCount[Hello World]]
$var[unicode;$byteCount[Héllö Wörld]]
$var[emoji;$byteCount[Hello 👋]]

ASCII: $var[ascii] bytes
Unicode (accents): $var[unicode] bytes
With emoji: $var[emoji] bytes
```

## Notes

- `$byteCount` differs from `$charCount`: `$charCount` counts characters, `$byteCount` counts bytes.
- With pure ASCII text, both values are identical.
- Discord limits messages to 2000 characters (not bytes), but this function remains useful for storage calculations.
