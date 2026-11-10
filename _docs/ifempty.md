---
layout: doc
title: $ifEmpty[]
translation_key: docs
category: "Lists & Helpers"
function_name: ifEmpty
syntax: $ifEmpty[value;fallback]
description: "Alias of `$default`: the value, or the fallback when it is empty."
---
# $ifEmpty — Alias of `$default`: the value, or the fallback when it is empty

## Syntax

```
$ifEmpty[value;fallback]
```

## Parameters

- **value** *(text, required)* — The value to check.
- **fallback** *(text, required)* — Used when the value is empty.

## Return Value

- string.

## Usage

```
$ifEmpty[;none] → "none"
```

## Example

```bdfd
$sendMessage[$ifEmpty[;none]]
```
