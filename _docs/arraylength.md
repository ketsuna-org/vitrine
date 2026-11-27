---
layout: doc
title: $arrayLength[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayLength
syntax: $arrayLength[array]
description: "Number of items of an array."
---
# $arrayLength — Number of items of an array.

## Syntax

```
$arrayLength[array]
```

## Parameters

- **array** *(text, required)* — Name of the array.

## Return Value

- string.

## Usage

```
$arrayLength[a] → "3"
```

## Example

```bdfd
$sendMessage[$arrayLength[a]]
```
