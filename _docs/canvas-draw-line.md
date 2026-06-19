---
layout: doc
title: $canvasDrawLine[]
translation_key: docs
category: Image & Canvas
function_name: canvasDrawLine
syntax: $canvasDrawLine[x1;y1;x2;y2;color;thickness;blend?;container?]
description: Draws a line between two points using Bresenham's algorithm with configurable thickness
---
Lines are drawn using Bresenham's algorithm for precision. When thickness is greater than 1, the line expands perpendicular to its direction, creating a band. Thickness is clamped between 1 and 100 pixels. Use blend modes like `overlay` or `multiply` to create subtle dividers and accent lines without fully opaque colors.
