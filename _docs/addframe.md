---
layout: doc
title: $addFrame[]
translation_key: docs
category: "Image & Canvas"
function_name: addFrame
syntax: $addFrame[(gif);frame;(options);(speed)]
description: "Adds a frame (a created frame, or a source) to the GIF encoder."
---
# $addFrame — Adds a frame (a created frame, or a source) to the GIF encoder.

## Syntax

```
$addFrame[(gif);frame;(options);(speed)]
```

## Parameters

- **gif** *(String, optional)* — Encoder name (empty: the only one)
- **frame** *(String, required)* — Frame name or source
- **options** *(Json, optional)* — Frame options
- **speed** *(Number, optional)* — Ignored

## Return Value

- None.

## Usage

```
$addFrame[gif;frame;options;speed] → result
```

## Example

```bdfd
$sendMessage[$addFrame[gif;frame;options;speed]]
```
