---
layout: doc
title: $newLinearGradient[]
translation_key: docs
category: "Image & Canvas"
function_name: newLinearGradient
syntax: $newLinearGradient[name;x1;y1;x2;y2;(stops)]
description: "Creates a linear gradient, to use by name as the style of $fill or $drawRect (shapes only)."
---
# $newLinearGradient — Creates a linear gradient, to use by name as the style of $fill or $drawRect (shapes only).

## Syntax

```
$newLinearGradient[name;x1;y1;x2;y2;(stops)]
```

## Parameters

- **name** *(String, required)* — Gradient name
- **x1** *(Number, required)* — Start X
- **y1** *(Number, required)* — Start Y
- **x2** *(Number, required)* — End X
- **y2** *(Number, required)* — End Y
- **stops** *(String, optional)* — Color stops: nested $addColorStop[;offset;color] calls

## Return Value

- None.

## Usage

```
$newLinearGradient[name;x1;y1;x2;y2;stops] → result
```

## Example

```bdfd
$sendMessage[$newLinearGradient[name;x1;y1;x2;y2;stops]]
```
