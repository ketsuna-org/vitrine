---
layout: doc
title: $GIFDecoder[]
translation_key: docs
category: "Image & Canvas"
function_name: GIFDecoder
syntax: $GIFDecoder[gif;src;(options)]
description: "Decodes a GIF from an image URL or data URL (at most 200 frames are kept). (alias of $newGIFDecoder)"
---
# $GIFDecoder — Decodes a GIF from an image URL or data URL (at most 200 frames are kept). (alias of $newGIFDecoder)

## Syntax

```
$GIFDecoder[gif;src;(options)]
```

## Parameters

- **gif** *(String, required)* — Decoder name
- **src** *(String, required)* — GIF source
- **options** *(String, optional)* — Name made with $decodeOptions

## Return Value

- None.

## Usage

```
$GIFDecoder[gif;src;options] → result
```

## Example

```bdfd
$sendMessage[$GIFDecoder[gif;src;options]]
```
