---
layout: doc
title: $lineDash[]
translation_key: docs
category: "Image & Canvas"
function_name: lineDash
syntax: $lineDash[(canvas);(segments)]
description: "Sets or returns the dash segments of a canvas, as a JSON list like [5, 3]."
---
# $lineDash — Sets or returns the dash segments of a canvas, as a JSON list like [5, 3].

## Syntax

```
$lineDash[(canvas);(segments)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **segments** *(String, optional)* — Segments

## Return Value

- String.

## Usage

```
$lineDash[canvas;segments] → result
```

## Example

```bdfd
$sendMessage[$lineDash[canvas;segments]]
```
