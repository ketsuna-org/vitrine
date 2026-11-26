---
layout: doc
title: $imageDimensions[]
translation_key: docs
category: "Image & Canvas"
function_name: imageDimensions
syntax: $imageDimensions[path;(property)]
description: "Returns the size of an image (URL, data URL, images://name or preload://name): width, height or JSON. (alias of $imageSize)"
---
# $imageDimensions — Returns the size of an image (URL, data URL, images://name or preload://name): width, height or JSON. (alias of $imageSize)

## Syntax

```
$imageDimensions[path;(property)]
```

## Parameters

- **path** *(String, required)* — Image source
- **property** *(String, optional)* — width or height (empty: JSON)

## Return Value

- String.

## Usage

```
$imageDimensions[path;property] → result
```

## Example

```bdfd
$sendMessage[$imageDimensions[path;property]]
```
