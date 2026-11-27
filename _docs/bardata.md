---
layout: doc
title: $barData[]
translation_key: docs
category: "Image & Canvas"
function_name: barData
syntax: $barData[value;style]
description: "Adds a data segment (value 0 to 100 and style) to the next progress bar or pie chart."
---
# $barData — Adds a data segment (value 0 to 100 and style) to the next progress bar or pie chart.

## Syntax

```
$barData[value;style]
```

## Parameters

- **value** *(Number, required)* — Percentage
- **style** *(String, required)* — Color or gradient name

## Return Value

- None.

## Usage

```
$barData[value;style] → result
```

## Example

```bdfd
$sendMessage[$barData[value;style]]
```
