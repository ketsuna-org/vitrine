---
layout: doc
title: $canvasDrawCircle
translation_key: docs
category: Image & Canvas
function_name: canvasDrawCircle
syntax: $canvasDrawCircle[x;y;radius;color;fill;blend?;container?]
description: Draws a circle (filled or outlined) with optional blend mode support
parameters:
  - name: x
    type: integer
    required: true
    description: Center X coordinate
  - name: y
    type: integer
    required: true
    description: Center Y coordinate
  - name: radius
    type: integer
    required: true
    description: Circle radius in pixels
  - name: color
    type: color
    required: true
    description: Fill or outline color
  - name: fill
    type: boolean
    required: true
    description: true = filled circle, false = outline only
  - name: blend
    type: string
    required: false
    description: Blend mode for per-pixel blending
    enum: "multiply, screen, overlay, darken, lighten, difference, hardLight, softLight"
  - name: container
    type: string
    required: false
    description: Container name for relative positioning
returns:
  type: canvas
  description: Modifies the canvas in-place. When blend is specified, uses per-pixel blending instead of the fast-path fill/draw.
related:
  - canvasDrawRect
  - canvasDrawArc
  - canvasDrawRoundedRect
examples:
  - title: Filled circle
    code: |
      $canvasCreate[dots;400;300;white]
      $canvasDrawCircle[200;150;80;E53935;true]
      $attachImage[dots]
  - title: Outlined circle with blend
    code: |
      $canvasDrawCircle[200;150;80;FFD700;false;multiply]
  - title: Multiple circles (decorative)
    code: |
      $canvasCreate[pattern;400;400;transparent]
      $canvasDrawCircle[100;100;40;E53935;true]
      $canvasDrawCircle[200;100;40;1E88E5;true]
      $canvasDrawCircle[300;100;40;43A047;true]
      $attachImage[pattern]
---
Circles are drawn using the midpoint algorithm for pixel-precise rendering. When `fill` is true, the circle is filled solid; when false, only a 1-pixel outline is drawn. Specifying a blend mode triggers per-pixel blending instead of the default fast-path, which may be slightly slower but enables compositing effects like multiply, screen, and overlay.
