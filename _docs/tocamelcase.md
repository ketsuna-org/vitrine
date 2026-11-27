---
layout: doc
title: $toCamelCase[]
translation_key: docs
category: "Math & Text"
function_name: toCamelCase
syntax: $toCamelCase[text]
description: "Converts text to camelCase."
---
# $toCamelCase — Converts text to camelCase.

## Syntax

```
$toCamelCase[text]
```

## Parameters

- **text** *(text, required)* — The text.

## Return Value

- string.

## Usage

```
$toCamelCase[Hello big world] → "helloBigWorld"
```

## Example

```bdfd
$sendMessage[$toCamelCase[Hello big world]]
```
