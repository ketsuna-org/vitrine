---
layout: doc
title: $arc[]
translation_key: docs
category: "Image & Canvas"
function_name: arc
syntax: $arc[(canvas);x;y;radius;startAngle;endAngle;(counterclockwise)]
description: "Adds a circular arc to the current path (angles in radians)."
---
# $arc — Adds a circular arc to the current path (angles in radians).

## Syntax

```
$arc[(canvas);x;y;radius;startAngle;endAngle;(counterclockwise)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **x** *(Number, required)* — Center X
- **y** *(Number, required)* — Center Y
- **radius** *(Number, required)* — Radius
- **startAngle** *(Number, required)* — Start angle
- **endAngle** *(Number, required)* — End angle
- **counterclockwise** *(Boolean, optional)* — true to go counterclockwise

## Return Value

- None.

## Usage

```
$arc[canvas;x;y;radius;startAngle;endAngle;counterclockwise] → result
```

## Example

```bdfd
$sendMessage[$arc[canvas;x;y;radius;startAngle;endAngle;counterclockwise]]
```
