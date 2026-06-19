---
layout: doc
title: $canvasDrawRect[]
translation_key: docs
category: Image & Canvas
function_name: canvasDrawRect
syntax: $canvasDrawRect[x;y;width;height;color;fill;blend?;container?]
description: Draws a rectangle (filled or outline only) with optional blend mode
---
When `fill` is false, the rectangle is drawn as a 1-pixel wide outline — there is no thickness parameter. For thicker outlines, use multiple overlapping rectangles or $canvasDrawLine calls. For rectangles with rounded corners, prefer $canvasDrawRoundedRect. The blend mode enables per-pixel compositing for effects like shadows and overlays.
