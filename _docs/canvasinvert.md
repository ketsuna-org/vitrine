---
layout: doc
title: $canvasInvert
translation_key: docs
category: "Image & Canvas"
function_name: canvasInvert
syntax: $canvasInvert[(unused)]
description: Inverts the colors of the current canvas (negative). One optional argument is accepted and ignored.
---

# $canvasInvert

The `$canvasInvert` function **inverts the colors of the current canvas**, producing a negative effect. Each pixel has its R, G, B components replaced by `255 - value`.

## Syntax

```
$canvasInvert
```

## Parameters

None. The engine accepts one optional argument and ignores it.

## Return value

An empty string. The effect is recorded for the current canvas (the last one made with `$canvasCreate`) and applied, in order, when the canvas is rendered.

## Behavior

- Each RGB channel is inverted: white becomes black, red becomes cyan, etc.
- Calling `$canvasInvert` twice in a row restores the original image.
- It applies to the whole canvas at the point where it is written: only the operations written before it are affected.

## Examples

### Simple inversion

```bdfd
$canvasCreate[photo;512;512]
$canvasLoadImage[$getAttachments[0];0;0;512;512]
$canvasInvert
$attachImage[photo]
$sendMessage[🔄 Image inverted!]
```

### Combination of effects

```bdfd
$canvasCreate[photo;512;512]
$canvasLoadImage[$getAttachments[0];0;0;512;512]
$canvasGrayscale
$canvasInvert
$attachImage[photo]
$sendMessage[🎞️ Grayscale + Negative!]
```

## Notes

- A canvas must have been created with `$canvasCreate[]` first; otherwise the call has no effect.
- In the examples, `$getAttachments[0]` raises an error when the message has no attachment.
- Inversion is reversible (re-call the function).
