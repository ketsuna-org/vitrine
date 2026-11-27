---
layout: doc
title: $createDecoder[]
translation_key: docs
category: "Image & Canvas"
function_name: createDecoder
syntax: $createDecoder[gif;src;(options)]
description: "Decodes a GIF from an image URL or data URL (at most 200 frames are kept). (alias of $newGIFDecoder)"
---
# $createDecoder — Decodes a GIF from an image URL or data URL (at most 200 frames are kept). (alias of $newGIFDecoder)

## Syntax

```
$createDecoder[gif;src;(options)]
```

## Parameters

- **gif** *(String, required)* — Decoder name
- **src** *(String, required)* — GIF source
- **options** *(String, optional)* — Name made with $decodeOptions

## Return Value

- None.

## Usage

```
$createDecoder[gif;src;options] → result
```

## Example

```bdfd
$sendMessage[$createDecoder[gif;src;options]]
```
