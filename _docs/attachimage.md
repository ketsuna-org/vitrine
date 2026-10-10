---
layout: doc
title: $attachImage
translation_key: docs
category: "Image & Canvas"
function_name: attachImage
syntax: $attachImage[(canvasName)]
description: Renders a canvas created with $canvasCreate[] and attaches it to the response as a PNG image named after the canvas.
---

# $attachImage

The `$attachImage[(canvasName)]` function **renders a canvas** built with the `$canvas*` functions and attaches the resulting PNG to the message sent with the response. It does not download a remote image: the image is the canvas.

## Syntax

```
$attachImage
$attachImage[canvasName]
```

## Parameters

| Parameter | Description |
|---|---|
| `canvasName` | Optional. Name of a canvas created with `$canvasCreate[]`. When omitted, the current canvas (the last one created with `$canvasCreate[]`) is used. |

Note that `$attachImage[]` (empty brackets) passes an empty name, which does not match a canvas created with a name.

## Return value

Returns an empty string. The rendered image is stored in the temporary variable `_canvasAttachment_<name>`, and the message sender attaches it as `<name>.png`.

## Behavior

- If the canvas does not exist, the call fails with: `Canvas "<name>" does not exist; use $canvasCreate first`.
- Canvases that are still pending when the response is sent are rendered automatically, so `$attachImage` is only needed to render a canvas explicitly at a given point. A `$sendMessage` placed earlier in the script does not render pending canvases: call `$attachImage` before it if that message must carry the image.
- Operations written after the call are not part of the rendered image.
- The operations of the canvas (`$canvasCreate[]`, `$canvasGrayscale`, ...) must be written before the call.

## Examples

### Attaching the current canvas

```bdfd
$canvasCreate[card;400;200;#202225]
$attachImage
```

### Attaching a named canvas

```bdfd
$canvasCreate[banner;600;200;#5865F2]
$attachImage[banner]
```

## Notes

- The attachment file name is the canvas name followed by `.png`.
