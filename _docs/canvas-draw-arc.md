---
layout: doc
title: $canvasDrawArc[]
translation_key: docs
category: Image & Canvas
function_name: canvasDrawArc
syntax: $canvasDrawArc[x;y;radius;startAngle;endAngle;color;fill?;thickness?;container?]
description: Draws an arc (outline) or pie slice (filled) using angle parameters in degrees
---
Angles follow standard mathematical convention: 0° points right (3 o'clock), 90° points down (6 o'clock), and -90° points up (12 o'clock). The arc is drawn counterclockwise from startAngle to endAngle. When `fill` is true, the result is a wedge (pie slice) connected to the center. For full circles, prefer $canvasDrawCircle which is more efficient.
