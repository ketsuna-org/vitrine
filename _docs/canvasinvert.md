---
layout: doc
title: $canvasInvert
translation_key: docs
category: "Canvas"
function_name: canvasInvert
syntax: $canvasInvert
description: Inverts the colors of the current canvas (negative). No parameters.
---

# $canvasInvert

The `$canvasInvert` function **inverts the colors of the current canvas**, producing a negative effect. Each pixel has its R, G, B components replaced by `255 - value`.

## Syntax

```
$canvasInvert
```

## Parameters

None.

## Return value

None. The canvas is modified directly.

## Behavior

- Each RGB channel is inverted: white becomes black, red becomes cyan, etc.
- Calling `$canvasInvert` twice in a row restores the original image.
- Transparent pixels are not affected.

## Examples

### Simple inversion

```bdfd
$canvasLoad[$attachment]
$canvasInvert
$attachCanvas[]
$sendMessage[🔄 Image inverted!]
```

### Temporary negative effect

```bdfd
$canvasLoad[$attachment]
$canvasInvert
$attachCanvas[negative.png]
$canvasInvert  ;; Return to original
$attachCanvas[original.png]
$sendMessage[🔁 Original + Negative:]
```

### Combination of effects

```bdfd
$canvasLoad[$attachment]
$canvasGrayscale
$canvasInvert
$attachCanvas[]
$sendMessage[🎞️ Grayscale + Negative!]
```

## Notes

- The canvas must be created or loaded beforehand.
- Inversion is reversible (re-call the function).
- For a partial effect, use `$canvasSetPixel[]` to invert specific pixels.
