---
layout: doc
title: $canvasCreate[]
translation_key: docs
category: Image & Canvas
function_name: canvasCreate
syntax: $canvasCreate[name;width;height;(color)]
description: Creates a canvas with the given name, size and optional background color; the following canvas functions draw on it.
---
$canvasCreate starts a new canvas and makes it the **current canvas**. The next `$canvas*` functions are recorded for it and the image is rendered when `$attachImage` is called or, at the latest, just before the response is sent. It returns an empty string.

## Parameters

| Parameter | Description |
|---|---|
| `name` | Required. Name of the canvas, used by `$attachImage[name]` and as the attachment file name (`name.png`). |
| `width` | Required. Width in pixels. A value that is not a whole number gives `400`; the value is limited to 1..4096. |
| `height` | Required. Height in pixels. A value that is not a whole number gives `300`; the value is limited to 1..4096. |
| `color` | Optional. Background color. White when omitted or unreadable. |

Colors are a 6-digit hexadecimal value with or without `#` (`#5865F2`), an 8-digit `RRGGBBAA` value, or one of these names (case-insensitive): red, green, blue, white, black, transparent, yellow, cyan, magenta, orange, purple, pink, gray, grey, lime, navy, teal, aqua, maroon, silver, gold. An empty or unreadable color becomes white. The 3-digit shorthand `#abc` is **not** supported (it is read as `000ABC`).

## Behavior

- The rendered image is an opaque RGB PNG: `transparent` as a background gives black.
- Creating a canvas with a name already used replaces the earlier canvas of that name.
- Several canvases can exist in one command, each with its own `$canvasCreate`; the functions that follow always apply to the last one created.
- `$attachImage` is only required when the image must be attached before a `$sendMessage` (see `$attachImage`).

## Examples

### Create a Custom Sized Canvas

```bdfd
$canvasCreate[card;600;200;#151515]
$canvasDrawText[Bot Creator Canvas;40;70;30;#5865F2]
$attachImage[card]
$title[Canvas Created]
$description[Rendered custom 600x200 canvas graphic.]
$color[#5865F2]
```
