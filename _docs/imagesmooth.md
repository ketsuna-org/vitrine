---
layout: doc
title: $imageSmooth[]
translation_key: docs
category: "Image & Canvas"
function_name: imageSmooth
syntax: $imageSmooth[(canvas);(enabled)]
description: "Sets or returns whether scaled images are smoothed (true) or drawn pixel by pixel (false). (alias of $imageSmoothing)"
---
# $imageSmooth — Sets or returns whether scaled images are smoothed (true) or drawn pixel by pixel (false). (alias of $imageSmoothing)

## Syntax

```
$imageSmooth[(canvas);(enabled)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **enabled** *(Boolean, optional)* — true or false

## Return Value

- Boolean.

## Usage

```
$imageSmooth[canvas;enabled] → result
```

## Example

```bdfd
$sendMessage[$imageSmooth[canvas;enabled]]
```
