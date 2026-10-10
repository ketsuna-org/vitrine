---
layout: doc
title: $canvasDrawLine[]
translation_key: docs
category: Image & Canvas
function_name: canvasDrawLine
syntax: $canvasDrawLine[x1;y1;x2;y2;color;thickness;(blend);(container)]
description: Draws a line between two points on the current canvas, with a thickness, an optional blend mode and container.
---
$canvasDrawLine draws a line from (x1, y1) to (x2, y2) on the current canvas. It returns an empty string.

Canvas functions work on the **current canvas**, the last one made with `$canvasCreate`; they have no canvas-name argument. Called before any `$canvasCreate` they have no effect. Numeric arguments must be whole numbers; text that is not a whole number gives the default of that parameter.

## Parameters

| Parameter | Description |
|---|---|
| `x1`, `y1` | Required. Start point. |
| `x2`, `y2` | Required. End point. |
| `color` | Required. Colors are a 6-digit hexadecimal value with or without `#` (`#5865F2`), an 8-digit `RRGGBBAA` value, or one of these names (case-insensitive): red, green, blue, white, black, transparent, yellow, cyan, magenta, orange, purple, pink, gray, grey, lime, navy, teal, aqua, maroon, silver, gold. An empty or unreadable color becomes white. The 3-digit shorthand `#abc` is **not** supported (it is read as `000ABC`). |
| `thickness` | Required. Width in pixels, limited to 1..100 (default `1` if not a whole number). |
| `blend` | Optional. Blend modes (case-insensitive): `multiply`, `screen`, `overlay`, `darken`, `lighten`, `difference`, `hardlight`, `softlight`. `normal`, `srcover` or an empty value use the plain drawing; any other text (for example `source-over`) is handled as a normal alpha blend. |
| `container` | Optional. Name of a container defined earlier with `$canvasContainer`: the x/y position is then offset by the container's x/y. An unknown name means no offset. It offsets both end points. |

## Behavior

- The line is traced pixel by pixel (Bresenham); pixels outside the canvas are skipped.
- Thickness `1` is a 1-pixel line. A larger thickness is a band across the line, but the band is only produced when the thickness is large enough compared to the length of the line: in tests a thickness of 3 on a 13-pixel line, and of 5 on a 100-pixel line, still gave a 1-pixel line, while 20 on a 100-pixel line gave a 21-pixel band. Do not rely on small thicknesses; draw several lines or a rectangle with `$canvasDrawRect` instead.

## Examples

### Draw Decorative Divider Line

```bdfd
$canvasCreate[dividerCard;500;150;#1A1A1A]
$canvasDrawText[Section Title;30;40;22;#FFFFFF]
$canvasDrawLine[30;60;470;60;#5865F2;1]
$canvasDrawText[Content details below divider;30;100;16;#AAAAAA]
$attachImage[dividerCard]
$sendMessage[Rendered card with drawn separator line.]
```
