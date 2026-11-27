---
layout: doc
title: $decoderSize[]
translation_key: docs
category: "Image & Canvas"
function_name: decoderSize
syntax: $decoderSize[gif;(property)]
description: "Returns the size of a GIF decoder: width, height or JSON. (alias of $GIFDecoderSize)"
---
# $decoderSize — Returns the size of a GIF decoder: width, height or JSON. (alias of $GIFDecoderSize)

## Syntax

```
$decoderSize[gif;(property)]
```

## Parameters

- **gif** *(String, required)* — Decoder name
- **property** *(String, optional)* — width or height

## Return Value

- String.

## Usage

```
$decoderSize[gif;property] → result
```

## Example

```bdfd
$sendMessage[$decoderSize[gif;property]]
```
