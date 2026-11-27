---
layout: doc
title: $frameOption[]
translation_key: docs
category: "Image & Canvas"
function_name: frameOption
syntax: $frameOption[frame;option]
description: "Returns an option of a created frame: delay, dispose, transparent, needsUserInput, top, left, width, height, interlaced, palette, buffer."
---
# $frameOption — Returns an option of a created frame: delay, dispose, transparent, needsUserInput, top, left, width, height, interlaced, palette, buffer.

## Syntax

```
$frameOption[frame;option]
```

## Parameters

- **frame** *(String, required)* — Frame name
- **option** *(String, required)* — Option

## Return Value

- String.

## Usage

```
$frameOption[frame;option] → result
```

## Example

```bdfd
$sendMessage[$frameOption[frame;option]]
```
