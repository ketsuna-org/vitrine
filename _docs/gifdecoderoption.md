---
layout: doc
title: $GIFDecoderOption[]
translation_key: docs
category: "Image & Canvas"
function_name: GIFDecoderOption
syntax: $GIFDecoderOption[gif;option]
description: "Returns an option of a GIF decoder: bgColor, bufferSize, globalPalette, lineLength, loops."
---
# $GIFDecoderOption — Returns an option of a GIF decoder: bgColor, bufferSize, globalPalette, lineLength, loops.

## Syntax

```
$GIFDecoderOption[gif;option]
```

## Parameters

- **gif** *(String, required)* — Decoder name
- **option** *(String, required)* — Option

## Return Value

- String.

## Usage

```
$GIFDecoderOption[gif;option] → result
```

## Example

```bdfd
$sendMessage[$GIFDecoderOption[gif;option]]
```
