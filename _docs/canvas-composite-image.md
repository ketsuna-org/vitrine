---
layout: doc
title: $canvasCompositeImage[]
translation_key: docs
category: Image & Canvas
function_name: canvasCompositeImage
syntax: $canvasCompositeImage[url;x;y;width;height;(shape);(blend);(container)]
description: Draws an image from a URL, data URL or base64 text on the current canvas, optionally resized, clipped to a shape and blended.
---
$canvasCompositeImage downloads (or decodes) an image and draws it on top of the current canvas. Unlike `$canvasLoadImage`, it always draws on the existing canvas and never replaces it. It returns an empty string.

Canvas functions work on the **current canvas**, the last one made with `$canvasCreate`; they have no canvas-name argument. Called before any `$canvasCreate` they have no effect. Numeric arguments must be whole numbers; text that is not a whole number gives the default of that parameter.

## Parameters

| Parameter | Description |
|---|---|
| `url` | Required. An `http://` or `https://` URL, a `data:` URL, or raw base64 image data. If it cannot be loaded or decoded (download over 15 seconds, HTTP status other than 200, not an image) the canvas is left unchanged without error. |
| `x`, `y` | Required. Position of the top-left corner of the image. |
| `width`, `height` | Required. The image is resized to this size **only if both are greater than 0**; otherwise it keeps its own size. |
| `shape` | Optional. Clipping mask: `circle` (also `round`, `oval`, `ellipse`), `rounded` or `roundrect` (corner radius 20, or `rounded:N` / `roundrect:N` for a radius of N pixels), `triangle`. A circle mask uses the smaller side of the image. Anything else means no mask. |
| `blend` | Optional. Blend modes (case-insensitive): `multiply`, `screen`, `overlay`, `darken`, `lighten`, `difference`, `hardlight`, `softlight`. `normal`, `srcover` or an empty value use the plain drawing; any other text (for example `source-over`) is handled as a normal alpha blend. |
| `container` | Optional. Name of a container defined earlier with `$canvasContainer`: the x/y position is then offset by the container's x/y. An unknown name means no offset. |

## Behavior

- The part of the image that falls outside the canvas is cut off.

## Examples

### Composite Avatar on Background Canvas

```bdfd
$canvasCreate[banner;700;250;#181818]
$canvasCompositeImage[$authorAvatar;30;30;120;120;circle]
$canvasDrawText[Welcome $username!;180;90;26;#FFFFFF]
$attachImage[banner]
$sendMessage[Generated welcome card with your Discord avatar!]
```
