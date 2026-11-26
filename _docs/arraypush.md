---
layout: doc
title: $arrayPush[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayPush
syntax: $arrayPush[array;values]
description: "Appends items to an array."
---
# $arrayPush — Appends items to an array.

## Syntax

```
$arrayPush[array;values]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **values** *(text, required)* — Items to append.

## Return Value

- string.

## Usage

```
$arrayPush[a;x;y]
```

## Example

```bdfd
$arrayLoad[a;,;3,1,2]
$arrayPush[a;9]
$sendMessage[$arrayJoin[a;-]]
```
