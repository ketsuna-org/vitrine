---
layout: doc
title: $canvasContainer[]
translation_key: docs
category: Image & Canvas
function_name: canvasContainer
syntax: $canvasContainer[name;x;y;width;height;(color)]
description: "Defines a named container: later canvas functions that name it in their container argument have their x/y offset by the container's position."
---
$canvasContainer registers a named origin on the current canvas. It draws nothing and returns an empty string.

## Parameters

| Parameter | Description |
|---|---|
| `name` | Required. Name of the container (spaces around it are removed). An empty name registers nothing. |
| `x`, `y` | Required. Position of the container's top-left corner on the canvas. |
| `width`, `height` | Required. Accepted, but only stored: they are not used by any function. |
| `color` | Optional. Accepted but **not drawn**: the container never paints a background. |

## Behavior

- A function that receives this name in its `container` argument adds the container's `x`/`y` to its own position. This applies to `$canvasLoadImage`, `$canvasCompositeImage`, `$canvasDrawText`, `$canvasDrawCircle`, `$canvasDrawRect`, `$canvasDrawLine`, `$canvasProgressBar` and `$canvasSetPixel`.
- Nothing is clipped to the container, and containers are not nested: the offset is that of the one named container only.
- A container only applies to operations written after it. If a function names a container that was not defined, no offset is applied.
- `$canvasInvert`, `$canvasGrayscale` and `$canvasRotate` always work on the whole canvas.

## Examples

### Position several elements relative to a panel

```bdfd
$canvasCreate[dashboard;800;400;#111111]
$canvasContainer[statsPanel;50;50;700;300;#1F1F1F]
$canvasDrawText[Server Statistics;20;40;22;#B19DF7;left;0;statsPanel]
$attachImage[dashboard]
$sendMessage[Rendered dashboard container.]
```

The text is drawn at x=70, y=90 on the canvas (container x/y + 20/40).
