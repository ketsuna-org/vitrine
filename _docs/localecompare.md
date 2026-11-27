---
layout: doc
title: $localeCompare[]
translation_key: docs
category: "Math & Text"
function_name: localeCompare
syntax: $localeCompare[first;second]
description: "Compares two texts: -1, 0 or 1."
---
# $localeCompare — Compares two texts: -1, 0 or 1.

## Syntax

```
$localeCompare[first;second]
```

## Parameters

- **first** *(text, required)* — First text.
- **second** *(text, required)* — Second text.

## Return Value

- string.

## Usage

```
$localeCompare[a;b] → "-1"
```

## Example

```bdfd
$sendMessage[$localeCompare[a;b]]
```
