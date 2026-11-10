---
layout: doc
title: $isEven[]
translation_key: docs
category: "Math & Text"
function_name: iseven
syntax: $isEven[integer]
description: "`true` when a whole number is even."
---
# $isEven — `true` when a whole number is even.

## Syntax

```
$isEven[integer]
```

## Parameters

- **integer** *(integer, required)* — The number.

## Return Value

- string.

## Usage

```
$isEven[4] → "true"
```

## Example

```bdfd
$if[$isEven[$userID]==true]even$endif
```
