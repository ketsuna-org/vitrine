---
layout: doc
title: $letSum[]
translation_key: docs
category: "Variables"
function_name: letSum
syntax: $letSum[name;value]
description: "Adds a number to a local variable (0 when unset)."
---
# $letSum — Adds a number to a local variable (0 when unset).

## Syntax

```
$letSum[name;value]
```

## Parameters

- **name** *(text, required)* — Variable name.
- **value** *(number, required)* — Number to add.

## Return Value

- string.

## Usage

```
$letSum[n;2] → n = 2
```

## Example

```bdfd
$let[n;1]
$letSum[n;2]
$sendMessage[$get[n]]
```
