---
layout: doc
title: $arrayShift[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayShift
syntax: $arrayShift[array]
description: "Removes and returns the first item."
---
# $arrayShift — Removes and returns the first item.

## Syntax

```
$arrayShift[array]
```

## Parameters

- **array** *(text, required)* — Name of the array.

## Return Value

- string.

## Usage

```
$arrayShift[a] → "3"
```

## Example

```bdfd
$arrayLoad[a;,;3,1,2]
$sendMessage[$arrayShift[a]]
```
