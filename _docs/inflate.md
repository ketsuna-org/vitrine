---
layout: doc
title: $inflate[]
translation_key: docs
category: "Math & Text"
function_name: inflate
syntax: $inflate[input;(encoding)]
description: "Decompresses given input"
---
# $inflate — Decompresses given input

## Syntax

```
$inflate[input;(encoding)]
```

## Parameters

- **input** *(text, required)* — The text to decompress
- **encoding** *(text, optional)* — The input encoding to use

## Return Value

- String.

## Usage

```
$inflate[input;(encoding)] → result
```

## Example

```bdfd
$sendMessage[$inflate[$deflate[hello hello hello hello;base64];base64]]
```
