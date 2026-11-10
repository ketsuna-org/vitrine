---
layout: doc
title: $ifThen[]
translation_key: docs
category: "Lists & Helpers"
function_name: ifThen
syntax: $ifThen[condition;ifTrue;(ifFalse)]
description: "Inline condition: returns one of two values. Only the chosen one is evaluated."
---
# $ifThen — Inline condition: returns one of two values

## Syntax

```
$ifThen[condition;ifTrue;(ifFalse)]
```

## Parameters

- **condition** *(condition, required)* — Same syntax as `$checkCondition`.
- **ifTrue** *(text, required)* — Returned when the condition is true.
- **ifFalse** *(text, optional)* — Returned when it is false. Default: empty.

## Return Value

- string.

## Usage

```
$ifThen[$authorID==123;Boss;Member] → "Boss" or "Member"
```

## Example

```bdfd
$sendMessage[$ifThen[$authorID==123;Boss;Member]]
```
