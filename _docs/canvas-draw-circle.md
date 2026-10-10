---
layout: doc
title: $canvasDrawCircle[]
translation_key: docs
category: Image & Canvas
function_name: canvasDrawCircle
syntax: $canvasDrawCircle[x;y;radius;color;fill;(blend);(container)]
description: Draws a circle (filled or 1-pixel outline) on the current canvas, with an optional blend mode and container.
---
$canvasDrawCircle draws a circle centered on (x, y) on the current canvas. It returns an empty string.

Canvas functions work on the **current canvas**, the last one made with `$canvasCreate`; they have no canvas-name argument. Called before any `$canvasCreate` they have no effect. Numeric arguments must be whole numbers; text that is not a whole number gives the default of that parameter.

## Parameters

| Parameter | Description |
|---|---|
| `x`, `y` | Required. Center of the circle. |
| `radius` | Required. Radius in pixels (default `10` if not a whole number). |
| `color` | Required. Colors are a 6-digit hexadecimal value with or without `#` (`#5865F2`), an 8-digit `RRGGBBAA` value, or one of these names (case-insensitive): red, green, blue, white, black, transparent, yellow, cyan, magenta, orange, purple, pink, gray, grey, lime, navy, teal, aqua, maroon, silver, gold. An empty or unreadable color becomes white. The 3-digit shorthand `#abc` is **not** supported (it is read as `000ABC`). |
| `fill` | Required. `true`, `yes` or `1` fill the shape; `false`, `no` or `0` draw only a 1-pixel outline. Any other value fills it. |
| `blend` | Optional. Blend modes (case-insensitive): `multiply`, `screen`, `overlay`, `darken`, `lighten`, `difference`, `hardlight`, `softlight`. `normal`, `srcover` or an empty value use the plain drawing; any other text (for example `source-over`) is handled as a normal alpha blend. |
| `container` | Optional. Name of a container defined earlier with `$canvasContainer`: the x/y position is then offset by the container's x/y. An unknown name means no offset. |

## Behavior

- With a blend mode the pixels are blended one by one instead of simply painted.
- Parts of the circle outside the canvas are cut off.

## Examples

### Draw Colored Indicator Circle

```bdfd
$canvasCreate[statusBadge;300;100;#1E1E1E]
$canvasDrawCircle[50;50;30;#57F287;true]
$canvasDrawText[Online - Operational;100;58;18;#FFFFFF]
$attachImage[statusBadge]
$sendMessage[Service health check badge.]
```
