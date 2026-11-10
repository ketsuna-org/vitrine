---
layout: doc
title: $cos[]
translation_key: docs
category: "Math & Text"
function_name: cos
syntax: $cos[radians]
description: "Cosine of an angle in radians, as a real decimal."
---
# $cos — Cosine of an angle in radians, as a real decimal.

## Syntax

```
$cos[radians]
```

## Parameters

- **radians** *(number, required)* — The angle in radians.

## Return Value

- string.

## Usage

```
$cos[0] → "1"
```

## Example

```bdfd
$sendMessage[$cos[0]]
```
