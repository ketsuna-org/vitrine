---
layout: doc
title: $attachImage[]
translation_key: docs
category: Image & Canvas
function_name: attachImage
syntax: $attachImage[name]
description: Finalizes the current canvas block, renders all queued operations, and registers the resulting image as a message attachment
---
$attachImage is the terminal operation for every canvas block. It triggers the deferred block flush: all queued drawing operations are executed in order, the result is rendered to a PNG, and the image is attached to the response. The `name` parameter becomes the filename (without extension) and is available at runtime via `((temp._canvasAttachment_name))`. You can produce multiple images in a single command by creating multiple canvas blocks, each terminated by its own $attachImage call. Without $attachImage, the canvas block is never flushed and no image is produced.
