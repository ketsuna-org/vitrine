---
layout: doc
title: $canvasGrayscale
translation_key: docs
category: "Image & Canvas"
function_name: canvasGrayscale
syntax: $canvasGrayscale[(unused)]
description: Converts the current canvas to grayscale. One optional argument is accepted and ignored.
---

# $canvasGrayscale

The `$canvasGrayscale` function **converts the current canvas to grayscale**, removing all color information (saturation) while preserving the brightness.

## Syntax

```
$canvasGrayscale
```

## Parameters

None. The engine accepts one optional argument and ignores it.

## Return value

An empty string. The effect is recorded for the current canvas (the last one made with `$canvasCreate`) and applied, in order, when the canvas is rendered.

## Behavior

- Each pixel of the canvas is converted to a shade of gray from a weighted sum of its channels: in tests `#FF0000` gives gray 76, `#00FF00` gives 149, `#0000FF` gives 29 and white stays white (about 30% red, 59% green, 11% blue).
- It applies to the whole canvas at the point where it is written: only the operations written before it are affected.
- It cannot be undone.

## Examples

### Simple conversion to black and white

```bdfd
$canvasCreate[photo;400;400]
$canvasLoadImage[https://example.com/photo.png;0;0;400;400]
$canvasGrayscale
$attachImage[photo]
$sendMessage[🎨 Image converted to grayscale!]
```

### Grayscale then invert

```bdfd
$canvasCreate[photo;400;400]
$canvasLoadImage[https://example.com/photo.png;0;0;400;400]
$canvasGrayscale
$canvasInvert
$attachImage[photo]
$sendMessage[🕰️ Negative effect applied!]
```

### Before/After comparison

```bdfd
$canvasCreate[before;400;400]
$canvasLoadImage[https://example.com/photo.png;0;0;400;400]
$canvasCreate[after;400;400]
$canvasLoadImage[https://example.com/photo.png;0;0;400;400]
$canvasGrayscale
$attachImage[before]
$attachImage[after]
$sendMessage[⚫ Original vs Grayscale:]
```

## Notes

- A canvas must have been created with `$canvasCreate[]` first; otherwise the call has no effect.
- `$canvasLoadImage[url;0;0;width;height]` draws the image over the canvas, so the grayscale then covers it.
- To invert the colors, use `$canvasInvert` instead.
- For rotation, use `$canvasRotate[degrees]`.
