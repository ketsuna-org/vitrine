---
layout: doc
title: $newDecoder[]
translation_key: docs
category: "Image & Canvas"
function_name: newDecoder
syntax: $newDecoder[gif;src;(options)]
description: "Decodes a GIF from an image URL or data URL (at most 200 frames are kept). (alias of $newGIFDecoder)"
---
# $newDecoder — Decodes a GIF from an image URL or data URL (at most 200 frames are kept). (alias of $newGIFDecoder)

## Syntax

```
$newDecoder[gif;src;(options)]
```

## Parameters

- **gif** *(String, required)* — Decoder name
- **src** *(String, required)* — GIF source
- **options** *(String, optional)* — Name made with $decodeOptions

## Return Value

- None.

## Usage

```
$newDecoder[gif;src;options] → result
```

## Example

```bdfd
$sendMessage[$newDecoder[gif;src;options]]
```
