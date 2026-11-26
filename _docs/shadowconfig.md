---
layout: doc
title: $shadowConfig[]
translation_key: docs
category: "Image & Canvas"
function_name: shadowConfig
syntax: $shadowConfig[(canvas);options]
description: "Sets or returns the shadow of what is drawn next (color, blur 0 to 100, offsetX, offsetY); pass a JSON object to set, a JSON list of names to read; all zero removes it. (alias of $shadowOptions)"
---
# $shadowConfig — Sets or returns the shadow of what is drawn next (color, blur 0 to 100, offsetX, offsetY); pass a JSON object to set, a JSON list of names to read; all zero removes it. (alias of $shadowOptions)

## Syntax

```
$shadowConfig[(canvas);options]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **options** *(Json, required)* — {"color":"#000000","blur":5,"offsetX":3,"offsetY":3}

## Return Value

- String.

## Usage

```
$shadowConfig[canvas;options] → result
```

## Example

```bdfd
$sendMessage[$shadowConfig[canvas;options]]
```
