---
layout: doc
title: $canvasCreate[]
translation_key: docs
category: Image & Canvas
function_name: canvasCreate
syntax: $canvasCreate[name;width;height;color?]
description: Creates a blank canvas with the given dimensions and optional background color
---
Canvas dimensions are clamped to a maximum of 4096 pixels in either direction. The canvas operates in a deferred rendering model: drawing operations are queued and only executed when the block is flushed — either when a non-canvas function is encountered or when $attachImage is called. Always pair $canvasCreate with a matching $attachImage to produce visible output.

## Examples

### Create a Custom Sized Canvas

```bdfd
$canvasCreate[card;600;200;#151515]
$canvasDrawText[card;Bot Creator Canvas;40;70;30;#5865F2]
$attachImage[card]
$title[Canvas Created]
$description[Rendered custom 600x200 canvas graphic.]
$color[#5865F2]
```
