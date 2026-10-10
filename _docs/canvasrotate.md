---
layout: doc
title: $canvasRotate
translation_key: docs
category: "Image & Canvas"
function_name: canvasRotate
syntax: $canvasRotate[degrees;(unused)]
description: Rotates the current canvas clockwise by an angle in degrees; the canvas grows to hold the result. A second argument is accepted and ignored.
---

# $canvasRotate

The `$canvasRotate[degrees]` function **rotates the current canvas** by an angle in degrees. For angles that are not multiples of 90 the canvas is enlarged to contain the rotated image.

## Syntax

```
$canvasRotate[degrees]
```

## Parameters

| Parameter | Description |
|---|---|
| `degrees` | Required. Angle in degrees; decimals are accepted. Positive values rotate clockwise, negative values counterclockwise. Text that is not a number, or `0`, leaves the canvas unchanged. |

The engine also accepts a second argument and ignores it.

## Return value

An empty string. The rotation is recorded for the current canvas (the last one made with `$canvasCreate`) and applied, in order, when the canvas is rendered.

## Behavior

- Tests: a 6x4 canvas rotated by 90 becomes 4x6 (top-left pixel moves to top-right), -90 and 270 give the same result (top-left moves to bottom-left), 180 keeps the size, 450 behaves like 90, 360 changes nothing, and 45 gives a 7x7 canvas.
- The canvas has no transparency: the corners left empty by a rotation that is not a multiple of 90 are black.
- It rotates the whole canvas at the point where it is written: only the operations written before it are rotated.

## Examples

### Simple 90° rotation

```bdfd
$canvasCreate[img;400;400;#202225]
$canvasLoadImage[$authorAvatar;0;0;400;400]
$canvasRotate[90]
$attachImage
$sendMessage[↪️ Image rotated by 90°!]
```

### Complete flip (180°)

```bdfd
$canvasCreate[img;400;400;#202225]
$canvasLoadImage[$authorAvatar;0;0;400;400]
$canvasRotate[180]
$attachImage
$sendMessage[🔃 Image flipped!]
```

### Counterclockwise rotation

```bdfd
$canvasCreate[img;400;400;#202225]
$canvasLoadImage[$authorAvatar;0;0;400;400]
$canvasRotate[-45]
$attachImage
$sendMessage[↩️ Counterclockwise rotation of 45°!]
```

### User-controlled rotation

```bdfd
$canvasCreate[img;400;400;#202225]
$canvasLoadImage[$authorAvatar;0;0;400;400]
$canvasRotate[$message[1]]
$attachImage
$sendMessage[The image has been rotated by $message[1]°!]
```

## Notes

- A canvas must have been created with `$canvasCreate[]` first; otherwise the call has no effect.
