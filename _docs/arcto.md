---
layout: doc
title: $arcTo[]
translation_key: docs
category: "Image & Canvas"
function_name: arcTo
syntax: $arcTo[(canvas);x1;y1;x2;y2;radius]
description: "Adds a circular arc between two tangents to the current path."
---
# $arcTo — Adds a circular arc between two tangents to the current path.

## Syntax

```
$arcTo[(canvas);x1;y1;x2;y2;radius]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **x1** *(Number, required)* — First point X
- **y1** *(Number, required)* — First point Y
- **x2** *(Number, required)* — Second point X
- **y2** *(Number, required)* — Second point Y
- **radius** *(Number, required)* — Radius

## Return Value

- None.

## Usage

```
$arcTo[canvas;x1;y1;x2;y2;radius] → result
```

## Example

```bdfd
$sendMessage[$arcTo[canvas;x1;y1;x2;y2;radius]]
```
