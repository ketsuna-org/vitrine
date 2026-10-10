---
layout: doc
title: $color[]
translation_key: docs
category: "Embed & Message"
function_name: color
syntax: $color[hexColor;(embedIndex)]
description: Sets the color of the left sidebar of a Discord embed. The color can be specified in hexadecimal or decimal integer format.
---

# $color[]

The `$color[]` function sets the **color** of the left sidebar of a Discord embed. This colored bar helps visually categorize your embeds (success, error, info, etc.).

## Syntax

```
$color[hexColor;(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `hexColor` | Color code: hexadecimal **with** the `#` prefix (`#5865F2`) or a decimal integer (`5793266`). |
| `embedIndex` | Optional. Index of the targeted embed, from 1 to 10 (1 by default, also when empty). Any other value is an error. |

## Return value

This function does not return anything: it modifies the response currently being constructed.

## Accepted Formats

| Format | Example | Result |
|---|---|---|
| Hexadecimal with # | `#5865F2` | Discord Blue |
| Hexadecimal without # | `5865F2` | **Not supported**: the text is read as a decimal number, which fails here, so the embed keeps no color (and a value made only of digits such as `123456` is read as the decimal number 123456). |
| Integer decimal | `5793266` | Discord Blue |

## Common Colors

| Name | Hex code | Integer |
|---|---|---|
| Discord Blue | `#5865F2` | 5793266 |
| Red | `#ED4245` | 15548997 |
| Green | `#57F287` | 5763719 |
| Yellow | `#FEE75C` | 16705372 |
| Orange | `#F26522` | 15885602 |
| White | `#FFFFFF` | 16777215 |
| Black | `#000000` | 0 |

## Examples

### Blue embed (information)

```bdfd
$title[Information]
$description[Your profile has been updated.]
$color[#5865F2]
```

### Red embed (error)

```bdfd
$title[Error]
$description[You do not have permission to use this command.]
$color[#ED4245]
```

### Green embed (success)

```bdfd
$title[Success]
$description[The operation completed successfully!]
$color[#57F287]
```

## Notes

- If `$color[]` is not called, the embed will not have a colored sidebar (transparent sidebar).
- The `#` prefix is **required** for hexadecimal colors. A value that is neither `#` + hexadecimal digits nor a decimal integer is ignored without an error (the embed has no color).
- Hexadecimal letters are case-insensitive: `#ff0000` is equivalent to `#FF0000`.
