---
layout: doc
title: $math[]
translation_key: docs
category: "Entity Info"
function_name: math
syntax: $math[expr]
description: "Runs math expression, returns nothing if incorrect expression."
---
# $math — Runs math expression, returns nothing if incorrect expression.

## Syntax

```
$math[expr]
```

## Parameters

- **expr** *(text, required)* — The math expression to run

## Return Value

- Number.

## Usage

```
$math[expr] → result
```

## Example

```bdfd
$sendMessage[$math[2+3*4]]
```
