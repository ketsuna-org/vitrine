---
layout: doc
title: $setOutputColor[]
translation_key: docs
category: "Image & Canvas"
function_name: setOutputColor
syntax: $setOutputColor[name;output]
description: "Sets the colors of the frames read: Rgba, IndexedPixels (read as Rgba) or Hex. (alias of $setColorOutput)"
---
# $setOutputColor — Sets the colors of the frames read: Rgba, IndexedPixels (read as Rgba) or Hex. (alias of $setColorOutput)

## Syntax

```
$setOutputColor[name;output]
```

## Parameters

- **name** *(String, required)* — Options name
- **output** *(String, required)* — Output

## Return Value

- None.

## Usage

```
$setOutputColor[name;output] → result
```

## Example

```bdfd
$sendMessage[$setOutputColor[name;output]]
```
