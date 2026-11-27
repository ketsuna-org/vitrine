---
layout: doc
title: $arrayUnshift[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayUnshift
syntax: $arrayUnshift[array;values]
description: "Adds items at the start of an array."
---
# $arrayUnshift — Adds items at the start of an array.

## Syntax

```
$arrayUnshift[array;values]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **values** *(text, required)* — Items to add.

## Return Value

- string.

## Usage

```
$arrayUnshift[a;0]
```

## Example

```bdfd
$arrayLoad[a;,;3,1,2]
$arrayUnshift[a;0]
$sendMessage[$arrayJoin[a;-]]
```
