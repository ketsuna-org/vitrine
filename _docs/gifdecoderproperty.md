---
layout: doc
title: $GIFDecoderProperty[]
translation_key: docs
category: "Image & Canvas"
function_name: GIFDecoderProperty
syntax: $GIFDecoderProperty[gif;option]
description: "Returns an option of a GIF decoder: bgColor, bufferSize, globalPalette, lineLength, loops. (alias of $GIFDecoderOption)"
---
# $GIFDecoderProperty — Returns an option of a GIF decoder: bgColor, bufferSize, globalPalette, lineLength, loops. (alias of $GIFDecoderOption)

## Syntax

```
$GIFDecoderProperty[gif;option]
```

## Parameters

- **gif** *(String, required)* — Decoder name
- **option** *(String, required)* — Option

## Return Value

- String.

## Usage

```
$GIFDecoderProperty[gif;option] → result
```

## Example

```bdfd
$sendMessage[$GIFDecoderProperty[gif;option]]
```
