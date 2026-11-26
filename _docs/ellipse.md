---
layout: doc
title: $ellipse[]
translation_key: docs
category: "Image & Canvas"
function_name: ellipse
syntax: $ellipse[(canvas);x;y;radiusX;radiusY;rotation;startAngle;endAngle;(counterclockwise)]
description: "Adds an elliptical arc to the current path (angles in radians)."
---
# $ellipse — Adds an elliptical arc to the current path (angles in radians).

## Syntax

```
$ellipse[(canvas);x;y;radiusX;radiusY;rotation;startAngle;endAngle;(counterclockwise)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **x** *(Number, required)* — Center X
- **y** *(Number, required)* — Center Y
- **radiusX** *(Number, required)* — Horizontal radius
- **radiusY** *(Number, required)* — Vertical radius
- **rotation** *(Number, required)* — Rotation of the ellipse
- **startAngle** *(Number, required)* — Start angle
- **endAngle** *(Number, required)* — End angle
- **counterclockwise** *(Boolean, optional)* — true to go counterclockwise

## Return Value

- None.

## Usage

```
$ellipse[canvas;x;y;radiusX;radiusY;rotation;startAngle;endAngle;counterclockwise] → result
```

## Example

```bdfd
$sendMessage[$ellipse[canvas;x;y;radiusX;radiusY;rotation;startAngle;endAngle;counterclockwise]]
```
