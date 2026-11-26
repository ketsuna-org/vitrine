---
layout: doc
title: $newGIFDecoder[]
translation_key: docs
category: "Image & Canvas"
function_name: newGIFDecoder
syntax: $newGIFDecoder[gif;src;(options)]
description: "Decodes a GIF from an image URL or data URL (at most 200 frames are kept)."
---
# $newGIFDecoder — Decodes a GIF from an image URL or data URL (at most 200 frames are kept).

## Syntax

```
$newGIFDecoder[gif;src;(options)]
```

## Parameters

- **gif** *(String, required)* — Decoder name
- **src** *(String, required)* — GIF source
- **options** *(String, optional)* — Name made with $decodeOptions

## Return Value

- None.

## Usage

```
$newGIFDecoder[gif;src;options] → result
```

## Example

```bdfd
$sendMessage[$newGIFDecoder[gif;src;options]]
```
