---
layout: doc
title: $closePath[]
translation_key: docs
category: "Image & Canvas"
function_name: closePath
syntax: $closePath[(canvas)]
description: "Closes the current subpath with a straight line to its start."
---
# $closePath — Closes the current subpath with a straight line to its start.

## Syntax

```
$closePath[(canvas)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)

## Return Value

- None.

## Usage

```
$closePath[canvas] → result
```

## Example

```bdfd
$sendMessage[$closePath[canvas]]
```
