---
layout: doc
title: $canvasDrawRoundedRect[]
translation_key: docs
category: Image & Canvas
function_name: canvasDrawRoundedRect
syntax: $canvasDrawRoundedRect[x;y;width;height;radius;color;fill;blend?;container?]
description: Draws a rectangle with rounded corners — filled or outline
---
The corner radius is automatically clamped to at most half the smaller dimension (min(width, height) / 2) to prevent overlap between adjacent corners. This makes it ideal for becaused backgrounds, button shapes, and UI containers. For outline-only mode, the outline follows the rounded path at 1-pixel width.
