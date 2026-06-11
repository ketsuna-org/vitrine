---
layout: doc
title: $canvasChartBar
translation_key: docs
category: Image & Canvas
function_name: canvasChartBar
syntax: $canvasChartBar[x;y;width;height;data;colors;labels?;maxValue?;barSpacing?;container?]
description: Draws a bar chart with automatic scaling and configurable bar spacing
parameters:
  - name: x
    type: integer
    required: true
    description: Top-left X of chart area
  - name: y
    type: integer
    required: true
    description: Top-left Y of chart area
  - name: width
    type: integer
    required: true
    description: Chart area width
  - name: height
    type: integer
    required: true
    description: Chart area height
  - name: data
    type: string
    required: true
    description: Semicolon-separated numeric values (e.g. "120;85;200;60;150")
  - name: colors
    type: string
    required: true
    description: Semicolon-separated hex colors. One per bar; uses 12-color fallback.
  - name: labels
    type: string
    required: false
    description: Semicolon-separated labels (accepted but not rendered at runtime)
  - name: maxValue
    type: number
    required: false
    description: Overrides the auto-calculated maximum value for scaling
  - name: barSpacing
    type: integer
    required: false
    default: "4"
    description: Gap between bars in pixels
  - name: container
    type: string
    required: false
    description: Container name
returns:
  type: canvas
  description: Modifies the canvas in-place. Bars grow upward from the bottom of the chart area.
related:
  - canvasChartPie
  - canvasChartLine
  - canvasProgressBar
examples:
  - title: Monthly members chart
    code: |
      $canvasChartBar[20;30;380;300;120;85;200;60;150;E53935;1E88E5;43A047;FB8C00;8E24AA;;;5]
  - title: Fixed-scale bar chart
    code: |
      $canvasChartBar[50;50;300;200;30;60;90;FFD700;8E24AA;00ACC1;;100;8]
---
Bar width is calculated automatically by dividing the chart area width by the number of data values, minus barSpacing. Without a maxValue override, the tallest bar is scaled to fill the full chart height. Labels are parsed but not rendered — use separate $canvasDrawText calls below each bar if you need labels. Use $canvasChartLine for datasets better suited to trends over discrete categories.
