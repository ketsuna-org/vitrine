---
layout: doc
title: $tan[]
translation_key: docs
category: "Math & Text"
function_name: tan
syntax: $tan[radians]
description: "Tangent of an angle in radians, as a real decimal."
---
# $tan — Tangent of an angle in radians, as a real decimal.

## Syntax

```
$tan[radians]
```

## Parameters

- **radians** *(number, required)* — The angle in radians.

## Return Value

- string.

## Usage

```
$tan[0] → "0"
```

## Example

```bdfd
$sendMessage[$tan[0]]
```
