---
layout: doc
title: $canvasChartPie
translation_key: docs
category: Image & Canvas
function_name: canvasChartPie
syntax: $canvasChartPie[x;y;radius;data;colors;labels?;startAngle?;container?]
description: Draws a pie chart from semicolon-separated data values with automatic color palette fallback
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
    description: Chart radius in pixels
  - name: data
    type: string
    required: true
    description: Semicolon-separated numeric values (e.g. "30;50;20"). Each value becomes a slice proportional to the total.
  - name: colors
    type: string
    required: true
    description: Semicolon-separated hex colors (e.g. "E53935;1E88E5;43A047"). Uses a 12-color palette fallback for unspecified slices.
  - name: labels
    type: string
    required: false
    description: Semicolon-separated labels (accepted but not rendered by the runtime)
  - name: startAngle
    type: number
    required: false
    default: "-90"
    description: Starting angle in degrees (-90 = top/12 o'clock)
  - name: container
    type: string
    required: false
    description: Container name
returns:
  type: canvas
  description: Modifies the canvas in-place. Each slice is drawn as a filled polygon from the center.
related:
  - canvasChartBar
  - canvasChartLine
  - canvasDrawArc
examples:
  - title: Activity breakdown
    code: |
      $canvasChartPie[200;200;120;45;30;25;E53935;1E88E5;43A047]
  - title: Custom start angle
    code: |
      $canvasChartPie[150;150;80;60;40;FFD700;8E24AA;;0]
---
Each data value is converted to a slice proportional to the sum of all values. If you provide fewer colors than data values, the runtime cycles through a built-in 12-color palette. Labels are accepted syntactically but are not drawn by the current runtime — they exist for forward compatibility. The default startAngle of -90° places the first slice at the 12 o'clock position.
