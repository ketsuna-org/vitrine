---
layout: doc
title: $save[]
translation_key: docs
category: "Image & Canvas"
function_name: save
syntax: $save[(canvas)]
description: "Saves the transform and line settings of a canvas (64 states at most)."
---
# $save — Saves the transform and line settings of a canvas (64 states at most).

## Syntax

```
$save[(canvas)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)

## Return Value

- None.

## Usage

```
$save[canvas] → result
```

## Example

```bdfd
$sendMessage[$save[canvas]]
```
