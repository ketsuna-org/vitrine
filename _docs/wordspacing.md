---
layout: doc
title: $wordSpacing[]
translation_key: docs
category: "Image & Canvas"
function_name: wordSpacing
syntax: $wordSpacing[(canvas);(spacing)]
description: "Sets or returns the spacing in pixels between words of the text drawn next."
---
# $wordSpacing — Sets or returns the spacing in pixels between words of the text drawn next.

## Syntax

```
$wordSpacing[(canvas);(spacing)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **spacing** *(Number, optional)* — Spacing (-200 to 200)

## Return Value

- Number.

## Usage

```
$wordSpacing[canvas;spacing] → result
```

## Example

```bdfd
$sendMessage[$wordSpacing[canvas;spacing]]
```
