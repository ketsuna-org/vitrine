---
layout: doc
title: $canvasLoadImage
translation_key: docs
category: Image & Canvas
function_name: canvasLoadImage
syntax: $canvasLoadImage[url;x?;y?;width?;height?;container?]
description: Loads an image from a URL, data URL, or base64 string onto the canvas
parameters:
  - name: url
    type: string
    required: true
    description: Image source — HTTP/HTTPS URL, data:image/...;base64 URL, or raw base64 string. HTTP requests have a 15-second timeout.
  - name: x
    type: integer
    required: false
    description: Horizontal position on canvas
  - name: y
    type: integer
    required: false
    description: Vertical position on canvas
  - name: width
    type: integer
    required: false
    description: Resize width. If specified with height, the image is resized before placement.
  - name: height
    type: integer
    required: false
    description: Resize height. Must be paired with width.
  - name: container
    type: string
    required: false
    description: Name of a registered container for relative positioning
returns:
  type: canvas
  description: If no canvas exists yet, the loaded image becomes the new canvas. If a canvas already exists AND x/y/width/height are specified, the image is composited on top. URL-loaded images are cached in a 50 MB LRU cache for the duration of the block.
related:
  - canvasCreate
  - canvasCompositeImage
  - canvasContainer
  - attachImage
examples:
  - title: Load image as canvas
    code: |
      $canvasLoadImage[https://example.com/background.jpg]
      $canvasDrawText[Overlay text;50;50;20;white]
      $attachImage[output]
  - title: Load and resize onto existing canvas
    code: |
      $canvasCreate[composite;800;600;#2C2F33]
      $canvasLoadImage[https://example.com/logo.png;50;50;200;200]
      $attachImage[composite]
---
$canvasLoadImage is dual-purpose: when no canvas exists, it creates one from the loaded image. When a canvas already exists, it composites the image on top. HTTP images are cached in a 50 MB LRU cache that persists for the lifetime of the current deferred block. If the URL fails to load within 15 seconds, the operation silently fails and the canvas remains unchanged.
