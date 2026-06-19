---
layout: doc
title: $canvasCompositeImage[]
translation_key: docs
category: Image & Canvas
function_name: canvasCompositeImage
syntax: $canvasCompositeImage[url;x;y;width;height;shape?;blend?;container?]
description: Overlays an external image at the given position with optional shape masking and blend modes
---
Unlike $canvasLoadImage, this function requires an existing canvas and always composites on top. Shape masks (circle, rounded, triangle, etc.) apply anti-aliased clipping — pixels outside the mask are fully transparent. The `rounded:N` and `roundrect:N` variants let you specify a corner radius in pixels (e.g., `rounded:20`). Blend modes use standard canvas compositing per the CSS spec.
