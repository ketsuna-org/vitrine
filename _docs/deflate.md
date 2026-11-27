---
layout: doc
title: $deflate[]
translation_key: docs
category: "Math & Text"
function_name: deflate
syntax: $deflate[input;(encoding)]
description: "Compresses given input"
---
# $deflate — Compresses given input

## Syntax

```
$deflate[input;(encoding)]
```

## Parameters

- **input** *(text, required)* — The text to compress
- **encoding** *(text, optional)* — The output encoding to use

## Return Value

- String.

## Usage

```
$deflate[input;(encoding)] → result
```

## Example

```bdfd
$sendMessage[$inflate[$deflate[abc abc abc;hex];hex]]
```
