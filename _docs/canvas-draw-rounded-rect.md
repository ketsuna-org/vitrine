---
layout: doc
title: $canvasDrawRoundedRect
translation_key: docs
category: Image & Canvas
function_name: canvasDrawRoundedRect
syntax: $canvasDrawRoundedRect[x;y;width;height;radius;color;fill;blend?;container?]
description: Draws a rectangle with rounded corners — filled or outline
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
    description: Rectangle width
  - name: height
    type: integer
    required: true
    description: Rectangle height
  - name: radius
    type: integer
    required: true
    description: Corner radius in pixels (clamped to min(width, height) / 2)
  - name: color
    type: color
    required: true
    description: Fill or outline color
  - name: fill
    type: boolean
    required: true
    description: true = filled, false = outline
  - name: blend
    type: string
    required: false
    description: Blend mode
    enum: "multiply, screen, overlay, darken, lighten, difference, hardLight, softLight"
  - name: container
    type: string
    required: false
    description: Container name
returns:
  type: canvas
  description: Modifies the canvas in-place.
related:
  - canvasDrawRect
  - canvasCompositeImage
  - canvasContainer
examples:
  - title: Card background
    code: |
      $canvasCreate[card;400;200;#1a1a2e]
      $canvasDrawRoundedRect[10;10;380;180;16;#23272A;true]
      $canvasDrawText[Content here;30;100;16;white]
      $attachImage[card]
---
The corner radius is automatically clamped to at most half the smaller dimension (min(width, height) / 2) to prevent overlap between adjacent corners. This makes it ideal for card backgrounds, button shapes, and UI containers. For outline-only mode, the outline follows the rounded path at 1-pixel width.
