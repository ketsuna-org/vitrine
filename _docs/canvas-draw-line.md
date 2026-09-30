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

## Examples

### Draw Decorative Divider Line

```bdfd
$canvasCreate[dividerCard;500;150;#1A1A1A]
$canvasDrawText[dividerCard;Section Title;30;40;22;#FFFFFF]
$canvasDrawLine[30;60;470;60;#5865F2;3;source-over;dividerCard]
$canvasDrawText[dividerCard;Content details below divider;30;100;16;#AAAAAA]
$attachImage[dividerCard]
$sendMessage[Rendered card with drawn separator line.]
```
