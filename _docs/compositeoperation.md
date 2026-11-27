---
layout: doc
title: $compositeOperation[]
translation_key: docs
category: "Image & Canvas"
function_name: compositeOperation
syntax: $compositeOperation[(canvas);(operation)]
description: "Sets or returns how what is drawn next blends: source-over, multiply, screen, overlay, darken, lighten, difference."
---
# $compositeOperation — Sets or returns how what is drawn next blends: source-over, multiply, screen, overlay, darken, lighten, difference.

## Syntax

```
$compositeOperation[(canvas);(operation)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **operation** *(String, optional)* — Operation

## Return Value

- String.

## Usage

```
$compositeOperation[canvas;operation] → result
```

## Example

```bdfd
$sendMessage[$compositeOperation[canvas;operation]]
```
