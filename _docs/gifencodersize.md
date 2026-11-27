---
layout: doc
title: $GIFEncoderSize[]
translation_key: docs
category: "Image & Canvas"
function_name: GIFEncoderSize
syntax: $GIFEncoderSize[(gif);(property)]
description: "Returns the size of a GIF encoder: width, height or JSON."
---
# $GIFEncoderSize — Returns the size of a GIF encoder: width, height or JSON.

## Syntax

```
$GIFEncoderSize[(gif);(property)]
```

## Parameters

- **gif** *(String, optional)* — Encoder name (empty: the only one)
- **property** *(String, optional)* — width or height

## Return Value

- String.

## Usage

```
$GIFEncoderSize[gif;property] → result
```

## Example

```bdfd
$sendMessage[$GIFEncoderSize[gif;property]]
```
