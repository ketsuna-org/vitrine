---
layout: doc
title: $letSub[]
translation_key: docs
category: "Variables"
function_name: letSub
syntax: $letSub[name;value]
description: "Subtracts a number from a local variable."
---
# $letSub — Subtracts a number from a local variable.

## Syntax

```
$letSub[name;value]
```

## Parameters

- **name** *(text, required)* — Variable name.
- **value** *(number, required)* — Number to subtract.

## Return Value

- string.

## Usage

```
$letSub[n;2] → n = -2
```

## Example

```bdfd
$let[n;10]
$letSub[n;4]
$sendMessage[$get[n]]
```
