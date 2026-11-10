---
layout: doc
title: $plural[]
translation_key: docs
category: "Lists & Helpers"
function_name: plural
syntax: $plural[count;singular;plural;(includeNumber)]
description: "Picks the singular or the plural form for a number."
---
# $plural — Picks the singular or the plural form for a number

## Syntax

```
$plural[count;singular;plural;(includeNumber)]
```

## Parameters

- **count** *(number, required)* — The number.
- **singular** *(text, required)* — Used when the number is 1 (or -1).
- **plural** *(text, required)* — Used for every other number.
- **includeNumber** *(`yes` or `no`, optional)* — `yes` (default) puts the number before the word.

## Return Value

- string.

## Usage

```
$plural[1;member;members] → "1 member"
$plural[5;member;members] → "5 members"
$plural[5;member;members;no] → "members"
```

## Example

```bdfd
$sendMessage[$plural[1;member;members]]
```
