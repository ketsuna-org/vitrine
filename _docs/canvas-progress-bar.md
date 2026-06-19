---
layout: doc
title: $canvasProgressBar[]
translation_key: docs
category: Image & Canvas
function_name: canvasProgressBar
syntax: $canvasProgressBar[x;y;width;height;value;fillColor;bgColor?;borderColor?;borderWidth?;direction?;borderRadius?;container?]
description: Draws a progress bar (horizontal or vertical) with background, fill, and optional border
---
The `value` parameter should be a number between 0 and 100 representing the fill percentage. If `bgColor` is omitted, the unfilled portion is left transparent. Note: the `borderRadius` parameter is accepted by the transpiler but is not yet rendered at runtime — rounded progress bars will appear with sharp corners. Horizontal bars fill left-to-right; vertical bars fill bottom-to-top.
