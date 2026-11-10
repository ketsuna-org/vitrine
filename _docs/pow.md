---
layout: doc
title: $pow[]
translation_key: docs
category: "Math & Text"
function_name: pow
syntax: $pow[base;exponent]
description: "Raises a number to a power."
---
# $pow — Raises a number to a power.

## Syntax

```
$pow[base;exponent]
```

## Parameters

- **base** *(number, required)* — The base.
- **exponent** *(number, required)* — The exponent.

## Return Value

- string.

## Usage

```
$pow[2;10] → "1024"
```

## Example

```bdfd
$sendMessage[$pow[2;10]]
```
