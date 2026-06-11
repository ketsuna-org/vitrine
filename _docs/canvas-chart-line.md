---
layout: doc
title: $canvasChartLine
translation_key: docs
category: Image & Canvas
function_name: canvasChartLine
syntax: $canvasChartLine[x;y;width;height;data;color;lineWidth?;fill?;showPoints?;pointRadius?;container?]
description: Draws a line chart with optional area fill and data point markers
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
    description: Semicolon-separated numeric values (minimum 2 values required)
  - name: color
    type: color
    required: true
    description: Line (and point) color
  - name: lineWidth
    type: integer
    required: false
    default: "2"
    description: Line thickness in pixels
  - name: fill
    type: boolean
    required: false
    default: "false"
    description: true = fill the area under the line with a semi-transparent version of the line color
  - name: showPoints
    type: boolean
    required: false
    default: "true"
    description: true = draw circles at each data point
  - name: pointRadius
    type: integer
    required: false
    default: "3"
    description: Radius of data point markers
  - name: container
    type: string
    required: false
    description: Container name
returns:
  type: canvas
  description: Modifies the canvas in-place.
related:
  - canvasChartBar
  - canvasChartPie
  - canvasDrawLine
examples:
  - title: Simple line chart
    code: |
      $canvasChartLine[20;30;400;200;10;45;30;60;25;1E88E5;3;true]
  - title: Without data points
    code: |
      $canvasChartLine[50;50;350;150;5;12;8;20;15;E53935;2;false;false]
---
At least 2 data values are required to draw a line. The chart auto-scales vertically based on the maximum value in the dataset. When `fill` is true, the area under the line is filled with a semi-transparent version of the line color, creating an area chart effect. Data points are rendered as small circles at each data position; disable them with `showPoints:false` for a cleaner look.
