---
layout: doc
title: $canvasContainer
translation_key: docs
category: Image & Canvas
function_name: canvasContainer
syntax: $canvasContainer[name;x;y;width;height;color?]
description: Defines a named positioning frame. Subsequent canvas operations referencing this container via their `container` parameter will have their coordinates offset relative to the container's position.
parameters:
  - name: name
    type: string
    required: true
    description: Unique container identifier
  - name: x
    type: integer
    required: true
    description: Container top-left X position
  - name: y
    type: integer
    required: true
    description: Container top-left Y position
  - name: width
    type: integer
    required: true
    description: Container width
  - name: height
    type: integer
    required: true
    description: Container height
  - name: color
    type: color
    required: false
    description: Background color (accepted by transpiler, drawn lazily at runtime)
returns:
  type: void
  description: Registers the container metadata. Does not draw anything directly but affects all subsequent operations that reference it.
related:
  - canvasCreate
  - canvasDrawText
  - canvasDrawRect
  - canvasProgressBar
examples:
  - title: Layout with containers
    code: |
      $canvasCreate[lakeout;800;600;#1a1a2e]
      $canvasContainer[header;20;20;760;80;#23272A]
      $canvasDrawText[My Dashboard;0;50;28;white;center;760;header]
      $canvasContainer[body;20;120;500;400]
      $canvasChartBar[0;0;500;380;120;85;200;60;150;E53935;1E88E5;43A047;FB8C00;8E24AA;;;5;body]
      $canvasContainer[sidebar;540;120;240;400]
      $canvasDrawText[Stats;20;30;18;#AAAAAA;;;sidebar]
      $canvasProgressBar[20;60;200;20;75;43A047;#555555;#FFFFFF;1;horizontal;;sidebar]
      $attachImage[lakeout]
---
Containers are the primary layout mechanism for complex canvas compositions. When a drawing operation specifies a `container` parameter, the operation's (x, y) coordinates become offsets relative to the container's top-left corner. Containers themselves don't render immediately — their background color is drawn lazily only if a child operation requires it. Multiple containers can be defined and nested conceptually, though the runtime treats all coordinates relative to the referenced container only.
