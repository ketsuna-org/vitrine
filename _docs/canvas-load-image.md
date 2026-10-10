---
layout: doc
title: $canvasLoadImage[]
translation_key: docs
category: Image & Canvas
function_name: canvasLoadImage
syntax: $canvasLoadImage[url;(x);(y);(width);(height);(container)]
description: Loads an image from a URL, data URL or base64 text; it replaces the canvas when placed at 0,0 without size, otherwise it is drawn on top of it.
---
$canvasLoadImage loads an image and either draws it on the current canvas or turns it into the canvas. It returns an empty string.

Canvas functions work on the **current canvas**, the last one made with `$canvasCreate`; they have no canvas-name argument. Called before any `$canvasCreate` they have no effect. Numeric arguments must be whole numbers; text that is not a whole number gives the default of that parameter.

## Parameters

| Parameter | Description |
|---|---|
| `url` | Required. An `http://` or `https://` URL, a `data:` URL, or raw base64 image data. If it is empty, cannot be downloaded within 15 seconds (or the HTTP status is not 200) or is not an image, the canvas is left unchanged without error. |
| `x`, `y` | Optional. Position of the image's top-left corner. Default `0`. |
| `width`, `height` | Optional. The image is resized only if **both** are greater than 0. |
| `container` | Optional. Name of a container defined earlier with `$canvasContainer`: the x/y position is then offset by the container's x/y. An unknown name means no offset. |

## Behavior

- **Drawn on top** of the existing canvas when at least one of these holds: `x` is not 0, `y` is not 0, or `width` is greater than 0 (even if `height` is missing, in which case the image is not resized and keeps its own size).
- **Replaces the canvas** otherwise, i.e. `$canvasLoadImage[url]` or `$canvasLoadImage[url;0;0]`: the loaded image (resized if both width and height are given) becomes the canvas, with its own size. The earlier drawings of that canvas are lost.
- Use `$canvasCompositeImage` when the image must always be drawn on the canvas, or to apply a shape mask or a blend mode.

## Examples

### Load Remote Image into Canvas

```bdfd
$canvasCreate[composite;600;300;#141414]
$canvasLoadImage[https://assets.bot-creator.fr/banner.png;0;0;600;300]
$attachImage[composite]
$title[Loaded Remote Image]
$description[Downloaded and rendered remote asset onto canvas.]
$color[#5865F2]
```

Here width and height are given, so the image is drawn over the canvas, resized to 600x300.
