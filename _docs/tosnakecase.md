---
layout: doc
title: $toSnakeCase[]
translation_key: docs
category: "Math & Text"
function_name: toSnakeCase
syntax: $toSnakeCase[text]
description: "Converts text to snake_case."
---
# $toSnakeCase — Converts text to snake_case.

## Syntax

```
$toSnakeCase[text]
```

## Parameters

- **text** *(text, required)* — The text.

## Return Value

- string.

## Usage

```
$toSnakeCase[Hello big world] → "hello_big_world"
```

## Example

```bdfd
$sendMessage[$toSnakeCase[Hello big world]]
```
