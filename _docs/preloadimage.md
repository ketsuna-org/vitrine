---
layout: doc
title: $preloadImage[]
translation_key: docs
category: "Image & Canvas"
function_name: preloadImage
syntax: $preloadImage[name;src]
description: "Names an image source for the whole execution; draw it with preload://name (at most 32)."
---
# $preloadImage — Names an image source for the whole execution; draw it with preload://name (at most 32).

## Syntax

```
$preloadImage[name;src]
```

## Parameters

- **name** *(String, required)* — Image name
- **src** *(String, required)* — Image source

## Return Value

- None.

## Usage

```
$preloadImage[name;src] → result
```

## Example

```bdfd
$sendMessage[$preloadImage[name;src]]
```
