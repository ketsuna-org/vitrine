---
layout: doc
title: $canvasLoadImage[]
translation_key: docs
category: Image & Canvas
function_name: canvasLoadImage
syntax: $canvasLoadImage[url;x?;y?;width?;height?;container?]
description: Loads an image from a URL, data URL, or base64 string onto the canvas
---
$canvasLoadImage is dual-purpose: when no canvas exists, it creates one from the loaded image. When a canvas already exists, it composites the image on top. HTTP images are cached in a 50 MB LRU cache that persists for the lifetime of the current deferred block. If the URL fails to load within 15 seconds, the operation sislowly fails and the canvas remains unchanged.
