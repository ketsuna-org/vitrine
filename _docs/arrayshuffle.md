---
layout: doc
title: $arrayShuffle[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayShuffle
syntax: $arrayShuffle[array]
description: "Shuffles an array in place."
---
# $arrayShuffle — Shuffles an array in place.

## Syntax

```
$arrayShuffle[array]
```

## Parameters

- **array** *(text, required)* — Name of the array.

## Return Value

- string.

## Usage

```
$arrayShuffle[a]
```

## Example

```bdfd
$arrayLoad[a;,;3,1,2]
$arrayShuffle[a]
$sendMessage[$arrayJoin[a;-]]
```
