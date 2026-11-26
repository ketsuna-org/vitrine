---
layout: doc
title: $textBaseline[]
translation_key: docs
category: "Image & Canvas"
function_name: textBaseline
syntax: $textBaseline[(canvas);(baseline)]
description: "Sets or returns the text baseline of a canvas (top, hanging, middle, alphabetic, ideographic, bottom)."
---
# $textBaseline — Sets or returns the text baseline of a canvas (top, hanging, middle, alphabetic, ideographic, bottom).

## Syntax

```
$textBaseline[(canvas);(baseline)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **baseline** *(String, optional)* — Baseline

## Return Value

- String.

## Usage

```
$textBaseline[canvas;baseline] → result
```

## Example

```bdfd
$sendMessage[$textBaseline[canvas;baseline]]
```
