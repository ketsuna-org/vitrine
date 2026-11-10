---
layout: doc
title: $parseInt[]
translation_key: docs
category: "Math & Text"
function_name: parseint
syntax: $parseInt[value;(fallback)]
description: "Reads the whole number at the start of a text, ignoring what follows."
---
# $parseInt — Reads the whole number at the start of a text, ignoring what follows.

## Syntax

```
$parseInt[value;(fallback)]
```

## Parameters

- **value** *(text, required)* — For example `42px`.
- **fallback** *(text, optional)* — Returned when no number starts the text.

## Return Value

- string.

## Usage

```
$parseInt[42px] → "42"
$parseInt[-7.9] → "-7"
```

## Example

```bdfd
$sendMessage[$parseInt[12 days]]
```
