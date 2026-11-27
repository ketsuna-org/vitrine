---
layout: doc
title: $imageSmoothing[]
translation_key: docs
category: "Image & Canvas"
function_name: imageSmoothing
syntax: $imageSmoothing[(canvas);(enabled)]
description: "Sets or returns whether scaled images are smoothed (true) or drawn pixel by pixel (false)."
---
# $imageSmoothing — Sets or returns whether scaled images are smoothed (true) or drawn pixel by pixel (false).

## Syntax

```
$imageSmoothing[(canvas);(enabled)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **enabled** *(Boolean, optional)* — true or false

## Return Value

- Boolean.

## Usage

```
$imageSmoothing[canvas;enabled] → result
```

## Example

```bdfd
$sendMessage[$imageSmoothing[canvas;enabled]]
```
