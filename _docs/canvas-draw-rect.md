---
layout: doc
title: $canvasDrawRect
translation_key: docs
category: Image & Canvas
function_name: canvasDrawRect
syntax: $canvasDrawRect[x;y;width;height;color;fill;blend?;container?]
description: Draws a rectangle (filled or outline only) with optional blend mode
parameters:
  - name: x
    type: integer
    required: true
    description: Top-left X coordinate
  - name: y
    type: integer
    required: true
    description: Top-left Y coordinate
  - name: width
    type: integer
    required: true
    description: Rectangle width in pixels
  - name: height
    type: integer
    required: true
    description: Rectangle height in pixels
  - name: color
    type: color
    required: true
    description: Fill or outline color
  - name: fill
    type: boolean
    required: true
    description: true = filled, false = outline only (1px border)
  - name: blend
    type: string
    required: false
    description: Blend mode
    enum: "multiply, screen, overlay, darken, lighten, difference, hardLight, softLight"
  - name: container
    type: string
    required: false
    description: Container name for relative positioning
returns:
  type: canvas
  description: Modifies the canvas in-place.
related:
  - canvasDrawRoundedRect
  - canvasDrawCircle
  - canvasDrawLine
examples:
  - title: Filled rectangle
    code: |
      $canvasCreate[box;300;200;white]
      $canvasDrawRect[50;50;200;100;E53935;true]
      $attachImage[box]
  - title: Outline rectangle
    code: |
      $canvasDrawRect[50;50;200;100;000000;false]
---
When `fill` is false, the rectangle is drawn as a 1-pixel wide outline — there is no thickness parameter. For thicker outlines, use multiple overlapping rectangles or $canvasDrawLine calls. For rectangles with rounded corners, prefer $canvasDrawRoundedRect. The blend mode enables per-pixel compositing for effects like shadows and overlays.
