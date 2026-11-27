---
layout: doc
title: $removeImage[]
translation_key: docs
category: "Image & Canvas"
function_name: removeImage
syntax: $removeImage[name]
description: "Forgets an image loaded with $loadImage (or, with preload://name, one of $preloadImage). (alias of $deleteImage)"
---
# $removeImage — Forgets an image loaded with $loadImage (or, with preload://name, one of $preloadImage). (alias of $deleteImage)

## Syntax

```
$removeImage[name]
```

## Parameters

- **name** *(String, required)* — Image name

## Return Value

- None.

## Usage

```
$removeImage[name] → result
```

## Example

```bdfd
$sendMessage[$removeImage[name]]
```
