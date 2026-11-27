---
layout: doc
title: $newConicGradient[]
translation_key: docs
category: "Image & Canvas"
function_name: newConicGradient
syntax: $newConicGradient[name;start;x;y;(stops)]
description: "Creates a conic gradient around a point, to use by name as the style of $fill or $drawRect."
---
# $newConicGradient — Creates a conic gradient around a point, to use by name as the style of $fill or $drawRect.

## Syntax

```
$newConicGradient[name;start;x;y;(stops)]
```

## Parameters

- **name** *(String, required)* — Gradient name
- **start** *(Number, required)* — Start angle in radians
- **x** *(Number, required)* — Center X
- **y** *(Number, required)* — Center Y
- **stops** *(String, optional)* — Color stops: nested $addColorStop[;offset;color] calls

## Return Value

- None.

## Usage

```
$newConicGradient[name;start;x;y;stops] → result
```

## Example

```bdfd
$sendMessage[$newConicGradient[name;start;x;y;stops]]
```
