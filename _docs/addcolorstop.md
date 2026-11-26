---
layout: doc
title: $addColorStop[]
translation_key: docs
category: "Image & Canvas"
function_name: addColorStop
syntax: $addColorStop[(name);offset;color]
description: "Adds a color stop (offset 0 to 100) to a gradient; with an empty name, to the next gradient created."
---
# $addColorStop — Adds a color stop (offset 0 to 100) to a gradient; with an empty name, to the next gradient created.

## Syntax

```
$addColorStop[(name);offset;color]
```

## Parameters

- **name** *(String, optional)* — Gradient name (empty: the next one)
- **offset** *(Number, required)* — Offset from 0 to 100
- **color** *(String, required)* — Color

## Return Value

- None.

## Usage

```
$addColorStop[name;offset;color] → result
```

## Example

```bdfd
$sendMessage[$addColorStop[name;offset;color]]
```
