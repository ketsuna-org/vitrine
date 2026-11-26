---
layout: doc
title: $beginPath[]
translation_key: docs
category: "Image & Canvas"
function_name: beginPath
syntax: $beginPath[(canvas)]
description: "Starts a new, empty path."
---
# $beginPath — Starts a new, empty path.

## Syntax

```
$beginPath[(canvas)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)

## Return Value

- None.

## Usage

```
$beginPath[canvas] → result
```

## Example

```bdfd
$sendMessage[$beginPath[canvas]]
```
