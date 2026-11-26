---
layout: doc
title: $opacity[]
translation_key: docs
category: "Image & Canvas"
function_name: opacity
syntax: $opacity[(canvas);(opacity)]
description: "Sets or returns the opacity (0 to 1) applied to what is drawn next (not to images)."
---
# $opacity — Sets or returns the opacity (0 to 1) applied to what is drawn next (not to images).

## Syntax

```
$opacity[(canvas);(opacity)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **opacity** *(Number, optional)* — Opacity

## Return Value

- Number.

## Usage

```
$opacity[canvas;opacity] → result
```

## Example

```bdfd
$sendMessage[$opacity[canvas;opacity]]
```
