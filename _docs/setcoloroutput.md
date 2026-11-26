---
layout: doc
title: $setColorOutput[]
translation_key: docs
category: "Image & Canvas"
function_name: setColorOutput
syntax: $setColorOutput[name;output]
description: "Sets the colors of the frames read: Rgba, IndexedPixels (read as Rgba) or Hex."
---
# $setColorOutput — Sets the colors of the frames read: Rgba, IndexedPixels (read as Rgba) or Hex.

## Syntax

```
$setColorOutput[name;output]
```

## Parameters

- **name** *(String, required)* — Options name
- **output** *(String, required)* — Output

## Return Value

- None.

## Usage

```
$setColorOutput[name;output] → result
```

## Example

```bdfd
$sendMessage[$setColorOutput[name;output]]
```
