---
layout: doc
title: $attachImage
translation_key: docs
category: Image & Canvas
function_name: attachImage
syntax: $attachImage[name]
description: Finalizes the current canvas block, renders all queued operations, and registers the resulting image as a message attachment
parameters:
  - name: name
    type: string
    required: true
    description: Filename for the attachment WITHOUT extension (e.g. "myChart" produces "myChart.png"). At runtime, accessible via ((temp._canvasAttachment_name)).
returns:
  type: image attachment
  description: Triggers the flush of the deferred image block. The rendered PNG is stored as a temporary attachment and sent with the response message. The image is also accessible via $getVar[temp._canvasAttachment_name].
related:
  - canvasCreate
  - canvasLoadImage
  - canvasDrawText
examples:
  - title: Minimal complete example
    code: |
      $canvasCreate[hello;300;200;#2C2F33]
      $canvasDrawText[Hello Discord!;20;100;28;white]
      $attachImage[hello]
  - title: Multiple canvases in one command
    code: |
      $canvasCreate[chart;400;300;white]
      $canvasChartPie[200;150;100;30;50;20;E53935;1E88E5;43A047]
      $attachImage[chart]
      
      $canvasCreate[card;400;200;#1a1a2e]
      $canvasDrawRoundedRect[10;10;380;180;16;#23272A;true]
      $canvasDrawText[User Card;20;50;24;white]
      $attachImage[card]
---
$attachImage is the terminal operation for every canvas block. It triggers the deferred block flush: all queued drawing operations are executed in order, the result is rendered to a PNG, and the image is attached to the response. The `name` parameter becomes the filename (without extension) and is available at runtime via `((temp._canvasAttachment_name))`. You can produce multiple images in a single command by creating multiple canvas blocks, each terminated by its own $attachImage call. Without $attachImage, the canvas block is never flushed and no image is produced.
