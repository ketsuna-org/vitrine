---
layout: doc
title: $parseFloat[]
translation_key: docs
category: "Math & Text"
function_name: parsefloat
syntax: $parseFloat[value;(fallback)]
description: "Reads the decimal number at the start of a text, ignoring what follows."
---
# $parseFloat — Reads the decimal number at the start of a text, ignoring what follows.

## Syntax

```
$parseFloat[value;(fallback)]
```

## Parameters

- **value** *(text, required)* — For example `3.5kg`.
- **fallback** *(text, optional)* — Returned when no number starts the text.

## Return Value

- string.

## Usage

```
$parseFloat[3.5kg] → "3.5"
```

## Example

```bdfd
$sendMessage[$parseFloat[3.5kg]]
```
