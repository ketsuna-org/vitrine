---
layout: doc
title: $typeof[]
translation_key: docs
category: "Math & Text"
function_name: typeof
syntax: $typeof[value]
description: "Returns the type of a value: string, number, boolean, bigint, object or undefined."
---
# $typeof — Returns the type of a value: string, number, boolean, bigint, object or undefined.

## Syntax

```
$typeof[value]
```

## Parameters

- **value** *(text, required)* — The value to test.

## Return Value

- string.

## Usage

```
$typeof[12] → "number"
```

## Example

```bdfd
$sendMessage[$typeof[12]]
```
