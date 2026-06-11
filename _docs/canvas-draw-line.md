---
layout: doc
title: $canvasDrawLine
translation_key: docs
category: Image & Canvas
function_name: canvasDrawLine
syntax: $canvasDrawLine[x1;y1;x2;y2;color;thickness;blend?;container?]
description: Draws a line between two points using Bresenham's algorithm with configurable thickness
parameters:
  - name: x1
    type: integer
    required: true
    description: Start point X coordinate
  - name: y1
    type: integer
    required: true
    description: Start point Y coordinate
  - name: x2
    type: integer
    required: true
    description: End point X coordinate
  - name: y2
    type: integer
    required: true
    description: End point Y coordinate
  - name: color
    type: color
    required: true
    description: Line color
  - name: thickness
    type: integer
    required: true
    description: Line width in pixels (clamped to 1–100). Thickness > 1 expands perpendicular to the line direction.
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
  - canvasDrawArc
  - canvasContainer
examples:
  - title: Thin separator line
    code: |
      $canvasDrawLine[20;100;380;100;#AAAAAA;1]
  - title: Thick accent line
    code: |
      $canvasDrawLine[0;0;200;200;E53935;4;overlay]
---
Lines are drawn using Bresenham's algorithm for precision. When thickness is greater than 1, the line expands perpendicular to its direction, creating a band. Thickness is clamped between 1 and 100 pixels. Use blend modes like `overlay` or `multiply` to create subtle dividers and accent lines without fully opaque colors.
