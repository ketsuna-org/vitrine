---
layout: doc
title: $let[]
translation_key: docs
category: "Variables"
function_name: let
syntax: $let[name;value]
description: "Stores a value in a local variable of the script run."
---
# $let — Stores a value in a local variable of the script run.

## Syntax

```
$let[name;value]
```

## Parameters

- **name** *(text, required)* — Variable name.
- **value** *(text, required)* — Value (JSON stays structured).

## Return Value

- string.

## Usage

```
$let[n;5]$get[n] → "5"
```

## Example

```bdfd
$sendMessage[$let[n;5]$get[n]]
```
