---
layout: doc
title: $arrayLoad[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayLoad
syntax: $arrayLoad[name;(separator);(values)]
description: "Loads an array from text split by a separator."
---
# $arrayLoad — Loads an array from text split by a separator.

## Syntax

```
$arrayLoad[name;(separator);(values)]
```

## Parameters

- **name** *(text, required)* — Name of the array.
- **separator** *(text, optional)* — Separator.
- **values** *(text, optional)* — The text to split.

## Return Value

- string.

## Usage

```
$arrayLoad[a;,;1,2,3] → ["1","2","3"]
```

## Example

```bdfd
$arrayLoad[a;,;1,2,3]
$sendMessage[$arrayLength[a]]
```
