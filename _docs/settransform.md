---
layout: doc
title: $setTransform[]
translation_key: docs
category: "Image & Canvas"
function_name: setTransform
syntax: $setTransform[(canvas);a;b;c;d;e;f]
description: "Sets the transform of a canvas."
---
# $setTransform — Sets the transform of a canvas.

## Syntax

```
$setTransform[(canvas);a;b;c;d;e;f]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **a** *(Number, required)* — a
- **b** *(Number, required)* — b
- **c** *(Number, required)* — c
- **d** *(Number, required)* — d
- **e** *(Number, required)* — e
- **f** *(Number, required)* — f

## Return Value

- None.

## Usage

```
$setTransform[canvas;a;b;c;d;e;f] → result
```

## Example

```bdfd
$sendMessage[$setTransform[canvas;a;b;c;d;e;f]]
```
