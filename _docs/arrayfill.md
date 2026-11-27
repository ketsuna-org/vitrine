---
layout: doc
title: $arrayFill[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayFill
syntax: $arrayFill[array;value]
description: "Sets every item of an array to a value."
---
# $arrayFill — Sets every item of an array to a value.

## Syntax

```
$arrayFill[array;value]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **value** *(text, required)* — The value.

## Return Value

- string.

## Usage

```
$arrayFill[a;x]
```

## Example

```bdfd
$arrayLoad[a;,;3,1,2]
$arrayFill[a;x]
$sendMessage[$arrayJoin[a;-]]
```
