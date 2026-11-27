---
layout: doc
title: $imageSize[]
translation_key: docs
category: "Image & Canvas"
function_name: imageSize
syntax: $imageSize[path;(property)]
description: "Returns the size of an image (URL, data URL, images://name or preload://name): width, height or JSON."
---
# $imageSize — Returns the size of an image (URL, data URL, images://name or preload://name): width, height or JSON.

## Syntax

```
$imageSize[path;(property)]
```

## Parameters

- **path** *(String, required)* — Image source
- **property** *(String, optional)* — width or height (empty: JSON)

## Return Value

- String.

## Usage

```
$imageSize[path;property] → result
```

## Example

```bdfd
$sendMessage[$imageSize[path;property]]
```
