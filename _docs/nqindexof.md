---
layout: doc
title: $NQindexOf[]
translation_key: docs
category: "Image & Canvas"
function_name: NQindexOf
syntax: $NQindexOf[name;r;g;b;a]
description: "Finds the index of the closest color of the color map."
---
# $NQindexOf — Finds the index of the closest color of the color map.

## Syntax

```
$NQindexOf[name;r;g;b;a]
```

## Parameters

- **name** *(String, required)* — Instance name
- **r** *(Number, required)* — Red
- **g** *(Number, required)* — Green
- **b** *(Number, required)* — Blue
- **a** *(Number, required)* — Alpha

## Return Value

- Number.

## Usage

```
$NQindexOf[name;r;g;b;a] → result
```

## Example

```bdfd
$sendMessage[$NQindexOf[name;r;g;b;a]]
```
