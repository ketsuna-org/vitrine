---
layout: doc
title: $deleteCanvas[]
translation_key: docs
category: "Image & Canvas"
function_name: deleteCanvas
syntax: $deleteCanvas[name]
description: "Deletes a canvas."
---
# $deleteCanvas — Deletes a canvas.

## Syntax

```
$deleteCanvas[name]
```

## Parameters

- **name** *(String, required)* — Canvas name

## Return Value

- None.

## Usage

```
$deleteCanvas[name] → result
```

## Example

```bdfd
$sendMessage[$deleteCanvas[name]]
```
