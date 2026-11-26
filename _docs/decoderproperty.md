---
layout: doc
title: $decoderProperty[]
translation_key: docs
category: "Image & Canvas"
function_name: decoderProperty
syntax: $decoderProperty[gif;option]
description: "Returns an option of a GIF decoder: bgColor, bufferSize, globalPalette, lineLength, loops. (alias of $GIFDecoderOption)"
---
# $decoderProperty — Returns an option of a GIF decoder: bgColor, bufferSize, globalPalette, lineLength, loops. (alias of $GIFDecoderOption)

## Syntax

```
$decoderProperty[gif;option]
```

## Parameters

- **gif** *(String, required)* — Decoder name
- **option** *(String, required)* — Option

## Return Value

- String.

## Usage

```
$decoderProperty[gif;option] → result
```

## Example

```bdfd
$sendMessage[$decoderProperty[gif;option]]
```
