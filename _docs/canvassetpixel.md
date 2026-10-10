---
layout: doc
title: $canvasSetPixel
translation_key: docs
category: "Image & Canvas"
function_name: canvasSetPixel
syntax: $canvasSetPixel[x;y;color;(container)]
description: Sets the color of one pixel of the current canvas. Coordinates outside the canvas are ignored.
---

# $canvasSetPixel

The `$canvasSetPixel[x;y;color]` function **sets the color of a single pixel** on the canvas at the specified coordinates.

## Syntax

```
$canvasSetPixel[x;y;color]
```

## Parameters

| Parameter | Description |
|---|---|
| `x` | X coordinate of the pixel. 0 = the left edge of the canvas. |
| `y` | Y coordinate of the pixel. 0 = the top edge of the canvas. |
| `color` | Required. A 6-digit hexadecimal color with or without `#`, an 8-digit `RRGGBBAA` value, or a color name such as `red`, `blue`, `gold`. An empty or unreadable color becomes white. The 3-digit shorthand `#abc` is not supported. |
| `container` | Optional. Name of a container defined earlier with `$canvasContainer`: `x`/`y` are then offset by the container's position. |

`x` and `y` must be whole numbers; otherwise they are read as `0`.

## Return value

An empty string. The pixel is recorded for the current canvas (the last one made with `$canvasCreate`) and set when the canvas is rendered.

## Behavior

- Coordinates outside the canvas boundaries are ignored (no error).
- The color is written as is; the transparency of an `RRGGBBAA` color is not applied.
- A canvas must have been created with `$canvasCreate[]` first; otherwise the call has no effect.

## Examples

### Single pixel

```bdfd
$canvasCreate[pixel;100;100]
$canvasSetPixel[50;50;#FF0000]
$attachImage[pixel]
$sendMessage[🔴 Red pixel placed at the center!]
```

### Draw a horizontal line

```bdfd
$canvasCreate[line;200;100]
$for[i=0;i<200;i++]
  $canvasSetPixel[$i;50;#5865F2]
$endfor
$attachImage[line]
$sendMessage[📏 Blue line drawn!]
```

### Cross at the center

```bdfd
$canvasCreate[cross;100;100]
$for[i=30;i<=70;i++]
  $canvasSetPixel[$i;50;#FF0000]
  $canvasSetPixel[50;$i;#FF0000]
$endfor
$attachImage[cross]
$sendMessage[➕ Red cross drawn!]
```

## Notes

- Coordinates start at 0 (not 1).
- To fill an entire area, use `$canvasDrawRect[]`.
- Modifying many pixels one by one can be slow; prefer vector drawing functions.
