---
layout: doc
title: $default[]
translation_key: docs
category: "Lists & Helpers"
function_name: default
syntax: $default[value;fallback]
description: "Gives the value, or the fallback when the value is empty. Also available as `$ifEmpty`."
---
# $default — Gives the value, or the fallback when the value is empty

## Syntax

```
$default[value;fallback]
```

## Parameters

- **value** *(text, required)* — The value to check. Spaces only count as empty.
- **fallback** *(text, required)* — Used only when the value is empty (it is not evaluated otherwise).

## Return Value

- string.

## Usage

```
$default[$getGuildVar[welcome];Welcome!] → "Welcome!" while the variable is empty
```

## Important Notes

- Replaces the `$if[$x==]…$else…$endif` pattern.

## Example

```bdfd
$sendMessage[$default[$getGuildVar[welcome];Welcome!]]
```
