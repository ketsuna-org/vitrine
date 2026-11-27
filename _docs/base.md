---
layout: doc
title: $base[]
translation_key: docs
category: "Math & Text"
function_name: base
syntax: $base[number;to;(from)]
description: "Converts a number between bases 2 and 36."
---
# $base — Converts a number between bases 2 and 36.

## Syntax

```
$base[number;to;(from)]
```

## Parameters

- **number** *(text, required)* — The number.
- **to** *(number, required)* — Target base.
- **from** *(number, optional)* — Source base (default 10).

## Return Value

- string.

## Usage

```
$base[255;16] → "ff"
```

## Example

```bdfd
$sendMessage[$base[255;16]]
```
