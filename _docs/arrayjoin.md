---
layout: doc
title: $arrayJoin[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayJoin
syntax: $arrayJoin[array;(separator)]
description: "Joins the items with a separator (default `, `)."
---
# $arrayJoin — Joins the items with a separator (default `, `).

## Syntax

```
$arrayJoin[array;(separator)]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **separator** *(text, optional)* — Separator.

## Return Value

- string.

## Usage

```
$arrayJoin[a;-] → "3-1-2"
```

## Example

```bdfd
$arrayLoad[a;,;3,1,2]
$sendMessage[$arrayJoin[a;-]]
```
