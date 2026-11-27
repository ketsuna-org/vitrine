---
layout: doc
title: $frameProp[]
translation_key: docs
category: "Image & Canvas"
function_name: frameProp
syntax: $frameProp[frame;option]
description: "Returns an option of a created frame: delay, dispose, transparent, needsUserInput, top, left, width, height, interlaced, palette, buffer. (alias of $frameOption)"
---
# $frameProp — Returns an option of a created frame: delay, dispose, transparent, needsUserInput, top, left, width, height, interlaced, palette, buffer. (alias of $frameOption)

## Syntax

```
$frameProp[frame;option]
```

## Parameters

- **frame** *(String, required)* — Frame name
- **option** *(String, required)* — Option

## Return Value

- String.

## Usage

```
$frameProp[frame;option] → result
```

## Example

```bdfd
$sendMessage[$frameProp[frame;option]]
```
