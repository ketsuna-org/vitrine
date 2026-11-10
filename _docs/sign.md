---
layout: doc
title: $sign[]
translation_key: docs
category: "Math & Text"
function_name: sign
syntax: $sign[number]
description: "Sign of a number: `1`, `-1` or `0`."
---
# $sign — Sign of a number: `1`, `-1` or `0`.

## Syntax

```
$sign[number]
```

## Parameters

- **number** *(number, required)* — The number.

## Return Value

- string.

## Usage

```
$sign[-3] → "-1"
```

## Example

```bdfd
$sendMessage[$sign[-3]]
```
