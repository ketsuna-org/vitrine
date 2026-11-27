---
layout: doc
title: $imgSize[]
translation_key: docs
category: "Image & Canvas"
function_name: imgSize
syntax: $imgSize[path;(property)]
description: "Returns the size of an image (URL, data URL, images://name or preload://name): width, height or JSON. (alias of $imageSize)"
---
# $imgSize — Returns the size of an image (URL, data URL, images://name or preload://name): width, height or JSON. (alias of $imageSize)

## Syntax

```
$imgSize[path;(property)]
```

## Parameters

- **path** *(String, required)* — Image source
- **property** *(String, optional)* — width or height (empty: JSON)

## Return Value

- String.

## Usage

```
$imgSize[path;property] → result
```

## Example

```bdfd
$sendMessage[$imgSize[path;property]]
```
