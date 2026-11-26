---
layout: doc
title: $gifFrameOption[]
translation_key: docs
category: "Image & Canvas"
function_name: gifFrameOption
syntax: $gifFrameOption[frame;option]
description: "Returns an option of a created frame: delay, dispose, transparent, needsUserInput, top, left, width, height, interlaced, palette, buffer. (alias of $frameOption)"
---
# $gifFrameOption — Returns an option of a created frame: delay, dispose, transparent, needsUserInput, top, left, width, height, interlaced, palette, buffer. (alias of $frameOption)

## Syntax

```
$gifFrameOption[frame;option]
```

## Parameters

- **frame** *(String, required)* — Frame name
- **option** *(String, required)* — Option

## Return Value

- String.

## Usage

```
$gifFrameOption[frame;option] → result
```

## Example

```bdfd
$sendMessage[$gifFrameOption[frame;option]]
```
