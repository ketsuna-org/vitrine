---
layout: doc
title: $clip[]
translation_key: docs
category: "Image & Canvas"
function_name: clip
syntax: $clip[(canvas);(fillRule)]
description: "Limits what is drawn next to the inside of the current path (up to 8 nested clips; save/restore keep them)."
---
# $clip — Limits what is drawn next to the inside of the current path (up to 8 nested clips; save/restore keep them).

## Syntax

```
$clip[(canvas);(fillRule)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **fillRule** *(String, optional)* — Accepted, even-odd is always used

## Return Value

- None.

## Usage

```
$clip[canvas;fillRule] → result
```

## Example

```bdfd
$sendMessage[$clip[canvas;fillRule]]
```
