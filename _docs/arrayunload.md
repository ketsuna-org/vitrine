---
layout: doc
title: $arrayUnload[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayUnload
syntax: $arrayUnload[array]
description: "Deletes an array."
---
# $arrayUnload — Deletes an array.

## Syntax

```
$arrayUnload[array]
```

## Parameters

- **array** *(text, required)* — Name of the array.

## Return Value

- string.

## Usage

```
$arrayUnload[a]
```

## Example

```bdfd
$arrayLoad[a;,;3,1,2]
$arrayUnload[a]
$sendMessage[$arrayLength[a]]
```
