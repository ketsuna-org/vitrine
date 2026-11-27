---
layout: doc
title: $has[]
translation_key: docs
category: "Variables"
function_name: has
syntax: $has[name]
description: "Tells whether a local variable exists."
---
# $has — Tells whether a local variable exists.

## Syntax

```
$has[name]
```

## Parameters

- **name** *(text, required)* — Variable name.

## Return Value

- string.

## Usage

```
$has[n] → "false"
```

## Example

```bdfd
$sendMessage[$has[n]]
```
