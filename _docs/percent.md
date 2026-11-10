---
layout: doc
title: $percent[]
translation_key: docs
category: "Math & Text"
function_name: percent
syntax: $percent[part;total;(decimals)]
description: "Percentage that `part` makes of `total`."
---
# $percent — Percentage that `part` makes of `total`.

## Syntax

```
$percent[part;total;(decimals)]
```

## Parameters

- **part** *(number, required)* — The part.
- **total** *(number, required)* — The total. Zero raises an error.
- **decimals** *(integer, optional)* — From 0 to 10. Default 0.

## Return Value

- string.

## Usage

```
$percent[1;3;1] → "33.3"
```

## Example

```bdfd
$sendMessage[$percent[$getUserVar[xp];1000]%]
```
