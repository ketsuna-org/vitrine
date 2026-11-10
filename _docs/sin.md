---
layout: doc
title: $sin[]
translation_key: docs
category: "Math & Text"
function_name: sin
syntax: $sin[radians]
description: "Sine of an angle in radians, as a real decimal."
---
# $sin — Sine of an angle in radians, as a real decimal.

## Syntax

```
$sin[radians]
```

## Parameters

- **radians** *(number, required)* — The angle in radians.

## Return Value

- string.

## Usage

```
$sin[0] → "0"
```

## Example

```bdfd
$sendMessage[$sin[$pi]]
```
