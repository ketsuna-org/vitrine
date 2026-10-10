---
layout: doc
title: $canvasDrawRect[]
translation_key: docs
category: Image & Canvas
function_name: canvasDrawRect
syntax: $canvasDrawRect[x;y;width;height;color;fill;(blend);(container)]
description: Draws a rectangle (filled or 1-pixel outline) on the current canvas, with an optional blend mode and container.
---
$canvasDrawRect draws a rectangle whose top-left corner is (x, y) on the current canvas. It returns an empty string.

Canvas functions work on the **current canvas**, the last one made with `$canvasCreate`; they have no canvas-name argument. Called before any `$canvasCreate` they have no effect. Numeric arguments must be whole numbers; text that is not a whole number gives the default of that parameter.

## Parameters

| Parameter | Description |
|---|---|
| `x`, `y` | Required. Top-left corner. |
| `width`, `height` | Required. Size in pixels (default `50` each if not a whole number). The rectangle covers both end pixels, so it is `width + 1` by `height + 1` pixels wide. |
| `color` | Required. Colors are a 6-digit hexadecimal value with or without `#` (`#5865F2`), an 8-digit `RRGGBBAA` value, or one of these names (case-insensitive): red, green, blue, white, black, transparent, yellow, cyan, magenta, orange, purple, pink, gray, grey, lime, navy, teal, aqua, maroon, silver, gold. An empty or unreadable color becomes white. The 3-digit shorthand `#abc` is **not** supported (it is read as `000ABC`). |
| `fill` | Required. `true`, `yes` or `1` fill the shape; `false`, `no` or `0` draw only a 1-pixel outline. Any other value fills it. |
| `blend` | Optional. Blend modes (case-insensitive): `multiply`, `screen`, `overlay`, `darken`, `lighten`, `difference`, `hardlight`, `softlight`. `normal`, `srcover` or an empty value use the plain drawing; any other text (for example `source-over`) is handled as a normal alpha blend. |
| `container` | Optional. Name of a container defined earlier with `$canvasContainer`: the x/y position is then offset by the container's x/y. An unknown name means no offset. |

## Behavior

- An outline is always 1 pixel wide: there is no thickness parameter. Draw several rectangles or use `$canvasDrawLine` for more.
- The rectangle is cut off at the edges of the canvas.
- There is no rounded-corner rectangle function; `$canvasProgressBar` has a `borderRadius` parameter for its own bar.

## Examples

### Draw an Accent Box

```bdfd
$canvasCreate[boxCanvas;400;160;#121212]
$canvasDrawRect[20;20;360;120;#9B30FF;true]
$canvasDrawText[Alert Box;50;85;24;#FFFFFF]
$attachImage[boxCanvas]
$sendMessage[Rendered rectangular accent box.]
```
