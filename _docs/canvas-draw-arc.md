---
layout: doc
title: $canvasDrawArc
translation_key: docs
category: Image & Canvas
function_name: canvasDrawArc
syntax: $canvasDrawArc[x;y;radius;startAngle;endAngle;color;fill?;thickness?;container?]
description: Draws an arc (outline) or pie slice (filled) using angle parameters in degrees
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
    description: Arc radius in pixels
  - name: startAngle
    type: number
    required: true
    description: Start angle in degrees (0° = right, 90° = down, -90° = up)
  - name: endAngle
    type: number
    required: true
    description: End angle in degrees
  - name: color
    type: color
    required: true
    description: Arc color
  - name: fill
    type: boolean
    required: false
    default: "false"
    description: true = filled pie slice, false = outline arc
  - name: thickness
    type: integer
    required: false
    default: "1"
    description: Outline thickness when fill is false
  - name: container
    type: string
    required: false
    description: Container name
returns:
  type: canvas
  description: Modifies the canvas in-place.
related:
  - canvasDrawCircle
  - canvasChartPie
  - canvasDrawLine
examples:
  - title: Pac-Man style pie slice
    code: |
      $canvasDrawArc[150;150;100;30;330;FFD700;true]
  - title: Outline arc
    code: |
      $canvasDrawArc[200;200;80;-90;90;E53935;false;3]
---
Angles follow standard mathematical convention: 0° points right (3 o'clock), 90° points down (6 o'clock), and -90° points up (12 o'clock). The arc is drawn counterclockwise from startAngle to endAngle. When `fill` is true, the result is a wedge (pie slice) connected to the center. For full circles, prefer $canvasDrawCircle which is more efficient.
