---
layout: doc
title: $newFrame[]
translation_key: docs
category: "Image & Canvas"
function_name: newFrame
syntax: $newFrame[frame;src;(options);(speed)]
description: "Creates a named GIF frame from a canvas name, an image URL or a data URL. Options JSON: delay (hundredths of a second), dispose, transparent, left, top. (alias of $createFrame)"
---
# $newFrame — Creates a named GIF frame from a canvas name, an image URL or a data URL. Options JSON: delay (hundredths of a second), dispose, transparent, left, top. (alias of $createFrame)

## Syntax

```
$newFrame[frame;src;(options);(speed)]
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
$newFrame[frame;src;options;speed] → result
```

## Example

```bdfd
$sendMessage[$newFrame[frame;src;options;speed]]
```
