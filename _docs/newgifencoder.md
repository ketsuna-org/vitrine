---
layout: doc
title: $newGIFEncoder[]
translation_key: docs
category: "Image & Canvas"
function_name: newGIFEncoder
syntax: $newGIFEncoder[gif;width;height]
description: "Creates a GIF encoder (at most 4, 512x512, 60 frames). Palette and functions are accepted by ForgeCanvas and not needed here."
---
# $newGIFEncoder — Creates a GIF encoder (at most 4, 512x512, 60 frames). Palette and functions are accepted by ForgeCanvas and not needed here.

## Syntax

```
$newGIFEncoder[gif;width;height]
```

## Parameters

- **gif** *(String, required)* — Encoder name
- **width** *(Number, required)* — Width
- **height** *(Number, required)* — Height

## Return Value

- None.

## Usage

```
$newGIFEncoder[gif;width;height] → result
```

## Example

```bdfd
$sendMessage[$newGIFEncoder[gif;width;height]]
```
