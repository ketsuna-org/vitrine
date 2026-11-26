---
layout: doc
title: $attachCanvas[]
translation_key: docs
category: "Image & Canvas"
function_name: attachCanvas
syntax: $attachCanvas[canvas;(filename);(format)]
description: "Attaches the canvas to the reply as a PNG."
---
# $attachCanvas — Attaches the canvas to the reply as a PNG.

## Syntax

```
$attachCanvas[canvas;(filename);(format)]
```

## Parameters

- **canvas** *(String, required)* — Canvas name
- **filename** *(String, optional)* — Accepted, the file is named after the canvas
- **format** *(String, optional)* — png (the only format)

## Return Value

- None.

## Usage

```
$attachCanvas[canvas;filename;format] → result
```

## Example

```bdfd
$sendMessage[$attachCanvas[canvas;filename;format]]
```
