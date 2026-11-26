---
layout: doc
title: $frameOpt[]
translation_key: docs
category: "Image & Canvas"
function_name: frameOpt
syntax: $frameOpt[frame;option]
description: "Returns an option of a created frame: delay, dispose, transparent, needsUserInput, top, left, width, height, interlaced, palette, buffer. (alias of $frameOption)"
---
# $frameOpt — Returns an option of a created frame: delay, dispose, transparent, needsUserInput, top, left, width, height, interlaced, palette, buffer. (alias of $frameOption)

## Syntax

```
$frameOpt[frame;option]
```

## Parameters

- **frame** *(String, required)* — Frame name
- **option** *(String, required)* — Option

## Return Value

- String.

## Usage

```
$frameOpt[frame;option] → result
```

## Example

```bdfd
$sendMessage[$frameOpt[frame;option]]
```
