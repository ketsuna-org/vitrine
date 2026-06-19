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
| `hexColor` | Color code in hexadecimal (`FF0000`, `#5865F2`) or decimal integer format. |
| `embedIndex` | Optional. Index of the embed to modify (0 by default). |

## Return value

This function does not return anything: it modifies the response currently being constructed.

## Accepted Formats

| Format | Example | Result |
|---|---|---|
| Hexadecimal with # | `#5865F2` | Discord Blue |
| Hexadecimal without # | `5865F2` | Discord Blue |
| Integer decimal | `5793266` | Discord Blue |

## Common Colors

| Name | Hex code | Integer |
|---|---|---|
| Discord Blue | `#5865F2` | 5793266 |
| Red | `#ED4245` | 15548997 |
| Green | `#57F287` | 5763719 |
| Yellow | `#FEE75C` | 16705372 |
| Orange | `#F26522` | 15878690 |
| White | `#FFFFFF` | 16777215 |
| Black | `#000000` | 0 |

## Examples

### Blue embed (information)

```bdfd
$title[Information]
$description[Your profile has been updated.]
$color[#5865F2]
$sendMessage[]
```

### Red embed (error)

```bdfd
$title[Error]
$description[You do not have permission to use this command.]
$color[#ED4245]
$sendMessage[]
```

### Green embed (success)

```bdfd
$title[Success]
$description[The operation completed successfully!]
$color[#57F287]
$sendMessage[]
```

## Notes

- If `$color[]` is not called, the embed will not have a colored sidebar (transparent sidebar).
- The `#` prefix is optional.
- Hexadecimal letters are case-insensitive: `#ff0000` is equivalent to `#FF0000`.
