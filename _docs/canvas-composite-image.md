---
layout: doc
title: $canvasCompositeImage
translation_key: docs
category: Image & Canvas
function_name: canvasCompositeImage
syntax: $canvasCompositeImage[url;x;y;width;height;shape?;blend?;container?]
description: Overlays an external image at the given position with optional shape masking and blend modes
parameters:
  - name: url
    type: string
    required: true
    description: Image source (same formats as canvasLoadImage)
  - name: x
    type: integer
    required: true
    description: Horizontal position
  - name: y
    type: integer
    required: true
    description: Vertical position
  - name: width
    type: integer
    required: true
    description: Resize width
  - name: height
    type: integer
    required: true
    description: Resize height
  - name: shape
    type: string
    required: false
    description: Shape mask applied to the overlay image before compositing
    enum: "circle, round, oval, ellipse, triangle, rounded:15, roundrect:15"
  - name: blend
    type: string
    required: false
    description: Blend mode for compositing the overlay
    enum: "multiply, screen, overlay, darken, lighten, difference, hardLight, softLight"
  - name: container
    type: string
    required: false
    description: Container name for relative positioning
returns:
  type: canvas
  description: Modifies the existing canvas in-place. The overlay is composited at (x, y) after optional shape masking and resizing.
related:
  - canvasLoadImage
  - canvasContainer
  - canvasDrawCircle
examples:
  - title: Circular avatar overlay
    code: |
      $canvasCreate[profile;600;300;#2C2F33]
      $canvasCompositeImage[$authorAvatar;50;50;128;128;circle]
      $canvasDrawText[$username;200;80;28;white]
      $attachImage[profile]
  - title: Image with rounded corners
    code: |
      $canvasCreate[card;500;400;#1a1a2e]
      $canvasCompositeImage[https://example.com/photo.jpg;25;25;450;350;rounded:20]
      $attachImage[card]
  - title: Screen blend for glow effect
    code: |
      $canvasLoadImage[https://example.com/bg.jpg]
      $canvasCompositeImage[https://example.com/glow.png;0;0;800;600;;screen]
      $attachImage[glow]
---
Unlike $canvasLoadImage, this function requires an existing canvas and always composites on top. Shape masks (circle, rounded, triangle, etc.) apply anti-aliased clipping — pixels outside the mask are fully transparent. The `rounded:N` and `roundrect:N` variants let you specify a corner radius in pixels (e.g., `rounded:20`). Blend modes use standard canvas compositing per the CSS spec.
