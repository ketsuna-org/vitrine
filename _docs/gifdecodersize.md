---
layout: doc
title: $GIFDecoderSize[]
translation_key: docs
category: "Image & Canvas"
function_name: GIFDecoderSize
syntax: $GIFDecoderSize[gif;(property)]
description: "Returns the size of a GIF decoder: width, height or JSON."
---
# $GIFDecoderSize — Returns the size of a GIF decoder: width, height or JSON.

## Syntax

```
$GIFDecoderSize[gif;(property)]
```

## Parameters

- **gif** *(String, required)* — Decoder name
- **property** *(String, optional)* — width or height

## Return Value

- String.

## Usage

```
$GIFDecoderSize[gif;property] → result
```

## Example

```bdfd
$sendMessage[$GIFDecoderSize[gif;property]]
```
