---
layout: doc
title: $encoderSize[]
translation_key: docs
category: "Image & Canvas"
function_name: encoderSize
syntax: $encoderSize[(gif);(property)]
description: "Returns the size of a GIF encoder: width, height or JSON. (alias of $GIFEncoderSize)"
---
# $encoderSize — Returns the size of a GIF encoder: width, height or JSON. (alias of $GIFEncoderSize)

## Syntax

```
$encoderSize[(gif);(property)]
```

## Parameters

- **gif** *(String, optional)* — Encoder name (empty: the only one)
- **property** *(String, optional)* — width or height

## Return Value

- String.

## Usage

```
$encoderSize[gif;property] → result
```

## Example

```bdfd
$sendMessage[$encoderSize[gif;property]]
```
