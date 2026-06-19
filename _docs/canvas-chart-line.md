---
layout: doc
title: $canvasChartLine[]
translation_key: docs
category: Image & Canvas
function_name: canvasChartLine
syntax: $canvasChartLine[x;y;width;height;data;color;lineWidth?;fill?;showPoints?;pointRadius?;container?]
description: Draws a line chart with optional area fill and data point markers
---
At least 2 data values are required to draw a line. The chart auto-scales vertically based on the maximum value in the dataset. When `fill` is true, the area under the line is filled with a semi-transparent version of the line color, creating an area chart effect. Data points are rendered as small circles at each data position; disable them with `showPoints:false` for a cleaner look.
