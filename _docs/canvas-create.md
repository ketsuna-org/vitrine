---
layout: doc
title: $canvasCreate
translation_key: docs
category: Image & Canvas
function_name: canvasCreate
syntax: $canvasCreate[name;width;height;color?]
description: Creates a blank canvas with the given dimensions and optional background color
parameters:
  - name: name
    type: string
    required: true
    description: Identifier for the canvas (used by $attachImage)
  - name: width
    type: integer
    required: true
    description: Canvas width in pixels (clamped to 1–4096)
  - name: height
    type: integer
    required: true
    description: Canvas height in pixels (clamped to 1–4096)
  - name: color
    type: color
    required: false
    default: "white"
    description: Background fill color
    enum: "red, green, blue, white, black, transparent, yellow, cyan, magenta, orange, purple, pink, gray, grey, lime, navy, teal, aqua, maroon, silver, gold, #RRGGBB, #RRGGBBAA"
returns:
  type: canvas
  description: Initialises a new deferred image block. The canvas is not rendered until the block is flushed (by encountering a non-canvas function or $attachImage).
related:
  - canvasLoadImage
  - attachImage
  - canvasDrawText
examples:
  - title: Basic white canvas
    code: |
      $canvasCreate[myImage;400;300]
      $canvasDrawText[Hello!;20;140;24;black]
      $attachImage[myImage]
  - title: Transparent canvas
    code: |
      $canvasCreate[overlay;200;200;transparent]
      $canvasDrawCircle[100;100;80;E53935;true]
      $attachImage[overlay]
  - title: Dark themed canvas
    code: |
      $canvasCreate[card;600;400;#1a1a2e]
      $canvasDrawText[Welcome;300;30;28;white;center;600]
      $attachImage[card]
---
Canvas dimensions are clamped to a maximum of 4096 pixels in either direction. The canvas operates in a deferred rendering model: drawing operations are queued and only executed when the block is flushed — either when a non-canvas function is encountered or when $attachImage is called. Always pair $canvasCreate with a matching $attachImage to produce visible output.
