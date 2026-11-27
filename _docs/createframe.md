---
layout: doc
title: $createFrame[]
translation_key: docs
category: "Image & Canvas"
function_name: createFrame
syntax: $createFrame[frame;src;(options);(speed)]
description: "Creates a named GIF frame from a canvas name, an image URL or a data URL. Options JSON: delay (hundredths of a second), dispose, transparent, left, top."
---
# $createFrame — Creates a named GIF frame from a canvas name, an image URL or a data URL. Options JSON: delay (hundredths of a second), dispose, transparent, left, top.

## Syntax

```
$createFrame[frame;src;(options);(speed)]
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
$createFrame[frame;src;options;speed] → result
```

## Example

```bdfd
$sendMessage[$createFrame[frame;src;options;speed]]
```
