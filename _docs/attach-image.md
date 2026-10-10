---
layout: doc
title: $attachImage[]
translation_key: docs
category: Image & Canvas
function_name: attachImage
syntax: $attachImage[(canvasName)]
description: "Renders a canvas created with $canvasCreate and attaches the PNG to the response; the canvas name is optional (default: the current canvas)."
---
$attachImage renders a canvas built with the `$canvas*` functions and makes the resulting PNG an attachment of the response (named `<canvasName>.png`). It returns an empty string.

## Parameters

| Parameter | Description |
|---|---|
| `canvasName` | Optional. Name given to `$canvasCreate`. Without it, the current canvas (the last one created) is used. |

## Behavior

- All operations written **before** the call for that canvas are rendered in order. Operations written after it are not part of the rendered image.
- If the canvas does not exist, the call fails with `Canvas "<name>" does not exist; use $canvasCreate first`.
- A canvas that is never passed to `$attachImage` is still rendered automatically just before the final response is sent. Call `$attachImage` explicitly before a `$sendMessage` that must carry the image, because `$sendMessage` does not render pending canvases.
- Several canvases (each with its own `$canvasCreate`) can be attached to one response.

## Examples

### Attach Generated Canvas to Discord Message

```bdfd
$canvasCreate[profileCard;600;200;#222222]
$canvasDrawText[Welcome $username!;30;50;28;#FFFFFF]
$attachImage[profileCard]
$title[Custom Image Attachment]
$description[Your profile card has been rendered successfully!]
$color[#9B30FF]
```
