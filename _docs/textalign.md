---
layout: doc
title: $textAlign[]
translation_key: docs
category: "Image & Canvas"
function_name: textAlign
syntax: $textAlign[(canvas);(align)]
description: "Sets or returns the text alignment of a canvas (left, right, center, start, end)."
---
# $textAlign — Sets or returns the text alignment of a canvas (left, right, center, start, end).

## Syntax

```
$textAlign[(canvas);(align)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **align** *(String, optional)* — Alignment

## Return Value

- String.

## Usage

```
$textAlign[canvas;align] → result
```

## Example

```bdfd
$sendMessage[$textAlign[canvas;align]]
```
