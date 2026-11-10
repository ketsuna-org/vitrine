---
layout: doc
title: $abs[]
translation_key: docs
category: "Math & Text"
function_name: abs
syntax: $abs[number]
description: "Absolute value of a number."
---
# $abs — Absolute value of a number.

## Syntax

```
$abs[number]
```

## Parameters

- **number** *(number, required)* — The number.

## Return Value

- string.

## Usage

```
$abs[-4.5] → "4.5"
```

## Example

```bdfd
$sendMessage[$abs[-4]]
```
