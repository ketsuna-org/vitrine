---
layout: doc
title: $toNumber[]
translation_key: docs
category: "Math & Text"
function_name: tonumber
syntax: $toNumber[value;(fallback)]
description: "Converts a text such as `416`, ` 416 ` or `"416"` into a number."
---
# $toNumber — Converts a text such as `416`, ` 416 ` or `"416"` into a number.

## Syntax

```
$toNumber[value;(fallback)]
```

## Parameters

- **value** *(text, required)* — The text to convert. Spaces and surrounding quotes are ignored.
- **fallback** *(text, optional)* — Returned when the value is not a number. Without it, the function raises an error.

## Return Value

- string.

## Usage

```
$toNumber[ 416 ] → "416"
$toNumber[abc;0] → "0"
```

## Example

```bdfd
$calculate[$toNumber[$getGuildVar[compteur]]+1]
```
