---
layout: doc
title: $decoderOption[]
translation_key: docs
category: "Image & Canvas"
function_name: decoderOption
syntax: $decoderOption[gif;option]
description: "Returns an option of a GIF decoder: bgColor, bufferSize, globalPalette, lineLength, loops. (alias of $GIFDecoderOption)"
---
# $decoderOption — Returns an option of a GIF decoder: bgColor, bufferSize, globalPalette, lineLength, loops. (alias of $GIFDecoderOption)

## Syntax

```
$decoderOption[gif;option]
```

## Parameters

- **gif** *(String, required)* — Decoder name
- **option** *(String, required)* — Option

## Return Value

- String.

## Usage

```
$decoderOption[gif;option] → result
```

## Example

```bdfd
$sendMessage[$decoderOption[gif;option]]
```
