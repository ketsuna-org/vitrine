---
layout: doc
title: $separateBigint[]
translation_key: docs
category: "Math & Text"
function_name: separateBigint
syntax: $separateBigint[number;(separator)]
description: "Groups the thousands of an integer of any size."
---
# $separateBigint — Groups the thousands of an integer of any size.

## Syntax

```
$separateBigint[number;(separator)]
```

## Parameters

- **number** *(number, required)* — The integer.
- **separator** *(text, optional)* — Separator (default `,`).

## Return Value

- string.

## Usage

```
$separateBigint[1234567] → "1,234,567"
```

## Example

```bdfd
$sendMessage[$separateBigint[1234567]]
```
