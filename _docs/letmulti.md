---
layout: doc
title: $letMulti[]
translation_key: docs
category: "Variables"
function_name: letMulti
syntax: $letMulti[name;value]
description: "Multiplies a local variable by a number."
---
# $letMulti — Multiplies a local variable by a number.

## Syntax

```
$letMulti[name;value]
```

## Parameters

- **name** *(text, required)* — Variable name.
- **value** *(number, required)* — Factor.

## Return Value

- string.

## Usage

```
$let[n;3]$letMulti[n;4] → 12
```

## Example

```bdfd
$let[n;3]
$letMulti[n;4]
$sendMessage[$get[n]]
```
