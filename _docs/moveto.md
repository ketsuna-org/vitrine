---
layout: doc
title: $moveTo[]
translation_key: docs
category: "Image & Canvas"
function_name: moveTo
syntax: $moveTo[(canvas);x;y]
description: "Starts a new subpath at a point."
---
# $moveTo — Starts a new subpath at a point.

## Syntax

```
$moveTo[(canvas);x;y]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **x** *(Number, required)* — X
- **y** *(Number, required)* — Y

## Return Value

- None.

## Usage

```
$moveTo[canvas;x;y] → result
```

## Example

```bdfd
$sendMessage[$moveTo[canvas;x;y]]
```
