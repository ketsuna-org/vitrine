---
layout: doc
title: $arrayPushJSON[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayPushJSON
syntax: $arrayPushJSON[array;values]
description: "Appends JSON values (numbers, objects, lists) to an array."
---
# $arrayPushJSON — Appends JSON values (numbers, objects, lists) to an array.

## Syntax

```
$arrayPushJSON[array;values]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **values** *(text, required)* — JSON values to append.

## Return Value

- string.

## Usage

```
$arrayPushJSON[a;{"x":1}]
```

## Example

```bdfd
$arrayLoad[a;,;3,1,2]
$arrayPushJSON[a;[1]]
$sendMessage[$arrayJoin[a;-]]
```
