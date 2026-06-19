---
layout: doc
title: $canvasGrayscale
translation_key: docs
category: "Canvas"
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
$canvasLoad[$attachment]
$canvasGrayscale
$attachCanvas[]
$sendMessage[🎨 Image converted to grayscale!]
```

### Old photo effect

```bdfd
$canvasLoad[$attachment]
$canvasGrayscale
$canvasColor[#6b4c2a]  ;; Sepia effect via tinting
$attachCanvas[]
$sendMessage[🕰️ Vintage effect applied!]
```

### Before/After comparison

```bdfd
$var[original;$attachment]
$canvasLoad[$var[original]]
$attachCanvas[before.png]

$canvasGrayscale
$attachCanvas[after.png]
$sendMessage[⚫ Original vs Grayscale:]
```

## Notes

- The canvas must be created or loaded before calling this function (via `$canvasCreate[]`, `$canvasLoad[]`, etc.).
- To invert the colors, use `$canvasInvert` instead.
- For rotation, use `$canvasRotate[degrees]`.
