---
layout: doc
title: $isValidHex
translation_key: docs
category: "Math & Text"
function_name: isValidHex
syntax: $isValidHex[value]
description: Checks if a string is a valid hexadecimal color code.
---

# $isValidHex

The function `$isValidHex[value]` checks if a string is a valid hexadecimal color code in the format `#RRGGBB` (or `RRGGBB` without the hashtag).

## Syntax

```
$isValidHex[value]
```

## Parameters

| Parameter | Description |
|---|---|
| `value` | The string to test, with or without the `#` prefix. |

## Return Value

- **Type**: Boolean
- `true` if the string is a valid 6-character hexadecimal code (0-9, A-F).
- `false` if the string contains invalid characters, is too short/long, or is empty.

## Behavior

- Accepts `#RRGGBB` and `RRGGBB` (6 hexadecimal characters).
- Letters are case-insensitive (A-F or a-f).
- Does not validate short formats (`#FFF`).
- Does not validate formats with alpha (`#RRGGBBAA`).

## Examples

### Validation before use

```bdfd
$var[couleur;$message[1]]
$if[$isValidHex[$var[couleur]]==true]
  $embedAddField[Color;$var[couleur];yes]
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
  $sendMessage[]
$else
  $sendMessage[❌ Invalid hex format. Usage: !color #5865F2]
$endif
```

## Notes

- `$isValidHex[#FF0000]` returns `true`.
- `$isValidHex[ff0000]` returns `true`.
- `$isValidHex[#FFF]` returns `false` (short format not supported).
- `$isValidHex[#GG0000]` returns `false` (G is not hex).
- `$isValidHex[]` (empty) returns `false`.
