---
layout: doc
title: $newGIFFrame[]
translation_key: docs
category: "Image & Canvas"
function_name: newGIFFrame
syntax: $newGIFFrame[frame;src;(options);(speed)]
description: "Creates a named GIF frame from a canvas name, an image URL or a data URL. Options JSON: delay (hundredths of a second), dispose, transparent, left, top. (alias of $createFrame)"
---
# $newGIFFrame — Creates a named GIF frame from a canvas name, an image URL or a data URL. Options JSON: delay (hundredths of a second), dispose, transparent, left, top. (alias of $createFrame)

## Syntax

```
$newGIFFrame[frame;src;(options);(speed)]
```

## Parameters

- **frame** *(String, required)* — Frame name
- **src** *(String, required)* — Canvas or image source
- **options** *(Json, optional)* — Frame options
- **speed** *(Number, optional)* — Ignored

## Return Value

- None.

## Usage

```
$newGIFFrame[frame;src;options;speed] → result
```

## Example

```bdfd
$sendMessage[$newGIFFrame[frame;src;options;speed]]
```
