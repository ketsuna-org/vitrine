---
layout: doc
title: $resetTransform[]
translation_key: docs
category: "Image & Canvas"
function_name: resetTransform
syntax: $resetTransform[(canvas)]
description: "Resets the transform of a canvas."
---
# $resetTransform — Resets the transform of a canvas.

## Syntax

```
$resetTransform[(canvas)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)

## Return Value

- None.

## Usage

```
$resetTransform[canvas] → result
```

## Example

```bdfd
$sendMessage[$resetTransform[canvas]]
```
