---
layout: doc
title: $newRadialGradient[]
translation_key: docs
category: "Image & Canvas"
function_name: newRadialGradient
syntax: $newRadialGradient[name;x1;y1;r1;x2;y2;r2;(stops)]
description: "Creates a radial gradient between two circles, to use by name as the style of $fill or $drawRect."
---
# $newRadialGradient — Creates a radial gradient between two circles, to use by name as the style of $fill or $drawRect.

## Syntax

```
$newRadialGradient[name;x1;y1;r1;x2;y2;r2;(stops)]
```

## Parameters

- **name** *(String, required)* — Gradient name
- **x1** *(Number, required)* — Start circle X
- **y1** *(Number, required)* — Start circle Y
- **r1** *(Number, required)* — Start circle radius
- **x2** *(Number, required)* — End circle X
- **y2** *(Number, required)* — End circle Y
- **r2** *(Number, required)* — End circle radius
- **stops** *(String, optional)* — Color stops: nested $addColorStop[;offset;color] calls

## Return Value

- None.

## Usage

```
$newRadialGradient[name;x1;y1;r1;x2;y2;r2;stops] → result
```

## Example

```bdfd
$sendMessage[$newRadialGradient[name;x1;y1;r1;x2;y2;r2;stops]]
```
