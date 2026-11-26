---
layout: doc
title: $arrayCreate[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayCreate
syntax: $arrayCreate[name;(length)]
description: "Creates an array (up to 100000 items), empty or filled with blanks."
---
# $arrayCreate — Creates an array (up to 100000 items), empty or filled with blanks.

## Syntax

```
$arrayCreate[name;(length)]
```

## Parameters

- **name** *(text, required)* — Name of the array.
- **length** *(number, optional)* — Number of blank items.

## Return Value

- string.

## Usage

```
$arrayCreate[a;3]$arrayLength[a] → "3"
```

## Example

```bdfd
$sendMessage[$arrayCreate[a;3]$arrayLength[a]]
```
