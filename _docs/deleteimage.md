---
layout: doc
title: $deleteImage[]
translation_key: docs
category: "Image & Canvas"
function_name: deleteImage
syntax: $deleteImage[name]
description: "Forgets an image loaded with $loadImage (or, with preload://name, one of $preloadImage)."
---
# $deleteImage — Forgets an image loaded with $loadImage (or, with preload://name, one of $preloadImage).

## Syntax

```
$deleteImage[name]
```

## Parameters

- **name** *(String, required)* — Image name

## Return Value

- None.

## Usage

```
$deleteImage[name] → result
```

## Example

```bdfd
$sendMessage[$deleteImage[name]]
```
