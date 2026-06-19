---
layout: doc
title: $canvasContainer[]
translation_key: docs
category: Image & Canvas
function_name: canvasContainer
syntax: $canvasContainer[name;x;y;width;height;color?]
description: Defines a named positioning frame. Subsequent canvas operations referencing this container via their `container` parameter will have their coordinates offset relative to the container's position.
---
Containers are the primary layout mechanism for complex canvas compositions. When a drawing operation specifies a `container` parameter, the operation's (x, y) coordinates become offsets relative to the container's top-left corner. Containers themselves don't render immediately — their background color is drawn lazily only if a child operation requires it. Multiple containers can be defined and nested conceptually, though the runtime treats all coordinates relative to the referenced container only.
