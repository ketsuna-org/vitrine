---
layout: doc
title: $arrayUnshiftJSON[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayUnshiftJSON
syntax: $arrayUnshiftJSON[array;values]
description: "Adds JSON values at the start of an array."
---
# $arrayUnshiftJSON — Adds JSON values at the start of an array.

## Syntax

```
$arrayUnshiftJSON[array;values]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **values** *(text, required)* — JSON values to add.

## Return Value

- string.

## Usage

```
$arrayUnshiftJSON[a;[1]]
```

## Example

```bdfd
$arrayLoad[a;,;3,1,2]
$arrayUnshiftJSON[a;[1]]
$sendMessage[$arrayJoin[a;-]]
```
