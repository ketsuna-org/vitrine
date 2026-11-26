---
layout: doc
title: $letterSpacing[]
translation_key: docs
category: "Image & Canvas"
function_name: letterSpacing
syntax: $letterSpacing[(canvas);(spacing)]
description: "Sets or returns the spacing in pixels between letters of the text drawn next."
---
# $letterSpacing — Sets or returns the spacing in pixels between letters of the text drawn next.

## Syntax

```
$letterSpacing[(canvas);(spacing)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **spacing** *(Number, optional)* — Spacing (-200 to 200)

## Return Value

- Number.

## Usage

```
$letterSpacing[canvas;spacing] → result
```

## Example

```bdfd
$sendMessage[$letterSpacing[canvas;spacing]]
```
