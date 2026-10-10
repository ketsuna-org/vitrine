---
layout: doc
title: $isValidHex
translation_key: docs
category: "Math & Text"
function_name: isValidHex
syntax: $isValidHex[value]
description: Checks if a string consists only of hexadecimal digits, with an optional leading #. The length is not checked.
---

# $isValidHex

The function `$isValidHex[value]` checks that a string is made only of hexadecimal digits (`0-9`, `a-f`, `A-F`), with an optional single `#` at the start. It does **not** check the length.

## Syntax

```
$isValidHex[value]
```

## Parameters

| Parameter | Description |
|---|---|
| `value` | The string to test, with or without the `#` prefix. Required, exactly one argument. |

## Return Value

- **Type**: Boolean
- `true` if the string is one or more hexadecimal digits, optionally preceded by one `#`.
- `false` if the string contains any other character (including spaces), is empty, or is just `#`.

## Behavior

- Accepts `#RRGGBB` and `RRGGBB`, but also any other length: `#FFF` and `12` are `true`.
- Letters are case-insensitive (A-F or a-f).
- Spaces are not trimmed: `$isValidHex[ ff]` is `false`.
- A `0x` prefix is not accepted (`0xff` is `false`).
- If a 6-digit color is required, check the length separately, for example with `$charCount`.

## Examples

### Validation before use

```bdfd
$var[couleur;$message[1]]
$if[$isValidHex[$var[couleur]]==true]
  $addField[Color;$var[couleur];yes]
  $color[$var[couleur]]
  $sendMessage[✅ Embed with the color $var[couleur].]
$else
  $sendMessage[❌ Invalid color. Expected format: #RRGGBB]
$endif
```

### Colored role command

```bdfd
$var[couleur;$message[1]]
$if[$isValidHex[$var[couleur]]==true]
  $modifyRole[$roleID[Color];color;$var[couleur]]
  $sendMessage[🎨 The color of the role was changed to $var[couleur]!]
$else
  $sendMessage[❌ Invalid format. Example: !color #FF5733]
$endif
```

### Interactive palette

```bdfd
$var[hex;$message[1]]
$if[$isValidHex[$var[hex]]==true]
  $title[🎨 Color Preview]
  $description[**Hex:** $var[hex]]
  $color[$var[hex]]
  $addTimestamp[]
$else
  $sendMessage[❌ Invalid hex format. Usage: !color #5865F2]
$endif
```

## Notes

- `$isValidHex[#FF0000]` returns `true`.
- `$isValidHex[ff0000]` returns `true`.
- `$isValidHex[#FFF]` returns `true` (the length is not checked).
- `$isValidHex[#GG0000]` returns `false` (G is not hex).
- `$isValidHex[]` (empty) returns `false`.
