---
layout: doc
title: $canvasRotate
translation_key: docs
category: "Canvas"
function_name: canvasRotate
syntax: $canvasRotate[degrees]
description: Rotates the canvas by a given angle in degrees.
---

# $canvasRotate

The `$canvasRotate[degrees]` function **rotates the current canvas** by a specified angle in degrees. The canvas is automatically resized to contain the entire image after rotation.

## Syntax

```
$canvasRotate[degrees]
```

## Parameters

| Parameter | Description |
|---|---|
| `degrees` | Angle of rotation in degrees. Positive values = clockwise. Negative values = counterclockwise. |

## Return value

None. The canvas is rotated and resized if necessary.

## Behavior

- The rotation is done around the center of the canvas.
- The canvas is automatically expanded to avoid clipping the image.
- Pixels outside the original image become transparent.
- Angle values are normalized modulo 360.

## Examples

### Simple 90° rotation

```bdfd
$canvasLoad[$attachment]
$canvasRotate[90]
$attachCanvas[]
$sendMessage[↪️ Image rotated by 90°!]
```

### Complete flip (180°)

```bdfd
$canvasLoad[$attachment]
$canvasRotate[180]
$attachCanvas[]
$sendMessage[🔃 Image flipped!]
```

### Counterclockwise rotation

```bdfd
$canvasLoad[$attachment]
$canvasRotate[-45]
$attachCanvas[]
$sendMessage[↩️ Counterclockwise rotation of 45°!]
```

### User-controlled rotation

```bdfd
$canvasLoad[$attachment]
$canvasRotate[$message[1]]
$attachCanvas[]
$sendMessage[The image has been rotated by $message[1]°!]
```

## Notes

- The canvas must be created or loaded before rotation.
- Rotations of 90°, 180°, or 270° are optimized and do not degrade the quality.
- Non-orthogonal rotations (e.g., 45°) require resampling.
