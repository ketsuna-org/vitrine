---
layout: doc
title: $letDivide[]
translation_key: docs
category: "Variables"
function_name: letDivide
syntax: $letDivide[name;value]
description: "Divides a local variable by a number (error when dividing by zero)."
---
# $letDivide — Divides a local variable by a number (error when dividing by zero).

## Syntax

```
$letDivide[name;value]
```

## Parameters

- **name** *(text, required)* — Variable name.
- **value** *(number, required)* — Divisor.

## Return Value

- string.

## Usage

```
$let[n;9]$letDivide[n;3] → 3
```

## Example

```bdfd
$let[n;9]
$letDivide[n;3]
$sendMessage[$get[n]]
```
