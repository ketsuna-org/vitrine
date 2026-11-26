---
layout: doc
title: $createGIFDecoder[]
translation_key: docs
category: "Image & Canvas"
function_name: createGIFDecoder
syntax: $createGIFDecoder[gif;src;(options)]
description: "Decodes a GIF from an image URL or data URL (at most 200 frames are kept). (alias of $newGIFDecoder)"
---
# $createGIFDecoder — Decodes a GIF from an image URL or data URL (at most 200 frames are kept). (alias of $newGIFDecoder)

## Syntax

```
$createGIFDecoder[gif;src;(options)]
```

## Parameters

- **gif** *(String, required)* — Decoder name
- **src** *(String, required)* — GIF source
- **options** *(String, optional)* — Name made with $decodeOptions

## Return Value

- None.

## Usage

```
$createGIFDecoder[gif;src;options] → result
```

## Example

```bdfd
$sendMessage[$createGIFDecoder[gif;src;options]]
```
