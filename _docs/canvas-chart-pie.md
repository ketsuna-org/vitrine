---
layout: doc
title: $canvasChartPie[]
translation_key: docs
category: Image & Canvas
function_name: canvasChartPie
syntax: $canvasChartPie[x;y;radius;data;colors;labels?;startAngle?;container?]
description: Draws a pie chart from semicolon-separated data values with automatic color palette fallback
---
Each data value is converted to a slice proportional to the sum of all values. If you provide fewer colors than data values, the runtime cycles through a built-in 12-color palette. Labels are accepted syntactically but are not drawn by the current runtime — they exist for forward compatibility. The default startAngle of -90° places the first slice at the 12 o'clock position.
