---
layout: doc
title: $canvasProgressBar
translation_key: docs
category: Image & Canvas
function_name: canvasProgressBar
syntax: $canvasProgressBar[x;y;width;height;value;fillColor;bgColor?;borderColor?;borderWidth?;direction?;borderRadius?;container?]
description: Draws a progress bar (horizontal or vertical) with background, fill, and optional border
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
    description: Bar width in pixels
  - name: height
    type: integer
    required: true
    description: Bar height in pixels
  - name: value
    type: number
    required: true
    description: Percentage filled (0–100). Supports variables.
  - name: fillColor
    type: color
    required: true
    description: Color of the filled portion
  - name: bgColor
    type: color
    required: false
    description: Background color of the unfilled portion
  - name: borderColor
    type: color
    required: false
    description: Border color
  - name: borderWidth
    type: integer
    required: false
    default: "0"
    description: Border thickness in pixels
  - name: direction
    type: string
    required: false
    description: Bar orientation
    enum: "horizontal, vertical"
  - name: borderRadius
    type: integer
    required: false
    default: "0"
    description: Corner radius (accepted by transpiler, not yet rendered at runtime)
  - name: container
    type: string
    required: false
    description: Container name
returns:
  type: canvas
  description: Modifies the canvas in-place.
related:
  - canvasDrawRect
  - canvasChartBar
  - canvasContainer
examples:
  - title: XP progress bar
    code: |
      $canvasProgressBar[20;100;300;24;$getUserVar[xp];43A047;#555555;#FFFFFF;1;horizontal]
  - title: Vertical health bar
    code: |
      $canvasProgressBar[400;50;30;200;75;E53935;#333333;#FFFFFF;2;vertical]
---
The `value` parameter should be a number between 0 and 100 representing the fill percentage. If `bgColor` is omitted, the unfilled portion is left transparent. Note: the `borderRadius` parameter is accepted by the transpiler but is not yet rendered at runtime — rounded progress bars will appear with sharp corners. Horizontal bars fill left-to-right; vertical bars fill bottom-to-top.
