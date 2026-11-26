---
layout: doc
title: $frameProperty[]
translation_key: docs
category: "Image & Canvas"
function_name: frameProperty
syntax: $frameProperty[frame;option]
description: "Returns an option of a created frame: delay, dispose, transparent, needsUserInput, top, left, width, height, interlaced, palette, buffer. (alias of $frameOption)"
---
# $frameProperty — Returns an option of a created frame: delay, dispose, transparent, needsUserInput, top, left, width, height, interlaced, palette, buffer. (alias of $frameOption)

## Syntax

```
$frameProperty[frame;option]
```

## Parameters

- **frame** *(String, required)* — Frame name
- **option** *(String, required)* — Option

## Return Value

- String.

## Usage

```
$frameProperty[frame;option] → result
```

## Example

```bdfd
$sendMessage[$frameProperty[frame;option]]
```
