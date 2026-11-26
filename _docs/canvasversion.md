---
layout: doc
title: $canvasVersion[]
translation_key: docs
category: "Image & Canvas"
function_name: canvasVersion
syntax: $canvasVersion[(napi)]
description: "Returns the name of the canvas engine."
---
# $canvasVersion — Returns the name of the canvas engine.

## Syntax

```
$canvasVersion[(napi)]
```

## Parameters

- **napi** *(Boolean, optional)* — Accepted for compatibility

## Return Value

- String.

## Usage

```
$canvasVersion[napi] → result
```

## Example

```bdfd
$sendMessage[$canvasVersion[napi]]
```
