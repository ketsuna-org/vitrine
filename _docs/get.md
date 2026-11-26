---
layout: doc
title: $get[]
translation_key: docs
category: "Variables"
function_name: get
syntax: $get[name]
description: "Reads a local variable set by $let."
---
# $get — Reads a local variable set by $let.

## Syntax

```
$get[name]
```

## Parameters

- **name** *(text, required)* — Variable name.

## Return Value

- string.

## Usage

```
$get[n] → value, or empty
```

## Example

```bdfd
$let[n;5]
$sendMessage[$get[n]]
```
