---
layout: doc
title: $canvasGrayscale
translation_key: docs
category: "Image & Canvas"
function_name: canvasGrayscale
syntax: $canvasGrayscale
description: Converts the current canvas to grayscale. No parameters.
---

# $canvasGrayscale

The `$canvasGrayscale` function **converts the current canvas to grayscale**, removing all color information (saturation) while preserving the brightness.

## Syntax

```
$canvasGrayscale
```

## Parameters

None.

## Return value

None. The canvas is modified directly.

## Behavior

- Each pixel of the canvas is converted to a shade of gray depending on its luminance.
- The formula typically uses a weighted average of the RGB channels (30% red, 59% green, 11% blue).
- The operation is irreversible (unless you save the state beforehand).

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

- The canvas must be created or loaded before calling this function (via `$canvasCreate[]`, then `$canvasLoadImage[]`, etc.).
- To invert the colors, use `$canvasInvert` instead.
- For rotation, use `$canvasRotate[degrees]`.
