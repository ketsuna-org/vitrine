---
layout: doc
title: $getTransform[]
translation_key: docs
category: "Image & Canvas"
function_name: getTransform
syntax: $getTransform[(canvas)]
description: "Returns the transform of a canvas as [a, b, c, d, e, f]."
---
# $getTransform — Returns the transform of a canvas as [a, b, c, d, e, f].

## Syntax

```
$getTransform[(canvas)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)

## Return Value

- String.

## Usage

```
$getTransform[canvas] → result
```

## Example

```bdfd
$sendMessage[$getTransform[canvas]]
```
