---
layout: doc
title: $canvasSetPixel
translation_key: docs
category: "Image & Canvas"
function_name: canvasSetPixel
syntax: $canvasSetPixel[x;y;color]
description: Sets the color of a specific pixel on the canvas.
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
| `color` | Color to apply, in hexadecimal format (`#RRGGBB`) or color name (`red`, `blue`, etc.). |

## Return value

None. The pixel is modified directly on the canvas.

## Behavior

- Coordinates outside the canvas boundaries are ignored (no error).
- The alpha channel of the pixel is kept as is.
- Works on any canvas previously created or loaded.

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
