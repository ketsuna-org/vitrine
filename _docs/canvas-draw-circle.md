---
layout: doc
title: $canvasDrawCircle[]
translation_key: docs
category: Image & Canvas
function_name: canvasDrawCircle
syntax: $canvasDrawCircle[x;y;radius;color;fill;blend?;container?]
description: Draws a circle (filled or outlined) with optional blend mode support
---
Circles are drawn using the midpoint algorithm for pixel-precise rendering. When `fill` is true, the circle is filled solid; when false, only a 1-pixel outline is drawn. Specifying a blend mode triggers per-pixel blending instead of the default fast-path, which may be slightly slower but enables compositing effects like multiply, screen, and overlay.
