---
layout: doc
title: $filter[]
translation_key: docs
category: "Image & Canvas"
function_name: filter
syntax: $filter[(canvas);method;(filter);(value)]
description: "Filters applied to what is drawn next: methods add, set, remove, clear, get, json, setRaw. Filters: blur, sepia, grayscale, brightness, contrast, invert, saturate."
---
# $filter — Filters applied to what is drawn next: methods add, set, remove, clear, get, json, setRaw. Filters: blur, sepia, grayscale, brightness, contrast, invert, saturate.

## Syntax

```
$filter[(canvas);method;(filter);(value)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **method** *(String, required)* — add, set, remove, clear, get, json or setRaw
- **filter** *(String, optional)* — Filter name
- **value** *(String, optional)* — Value, for example 5px, 50% or 1.2

## Return Value

- String.

## Usage

```
$filter[canvas;method;filter;value] → result
```

## Example

```bdfd
$sendMessage[$filter[canvas;method;filter;value]]
```
