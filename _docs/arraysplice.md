---
layout: doc
title: $arraySplice[]
translation_key: docs
category: "Lists & Helpers"
function_name: arraySplice
syntax: $arraySplice[array;index;deleteCount;(elements)]
description: "Removes items from an index and optionally inserts others; returns the removed items as JSON."
---
# $arraySplice — Removes items from an index and optionally inserts others; returns the removed items as JSON.

## Syntax

```
$arraySplice[array;index;deleteCount;(elements)]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **index** *(number, required)* — Start index.
- **deleteCount** *(number, required)* — Items to remove.
- **elements** *(text, optional)* — Items to insert.

## Return Value

- string.

## Usage

```
$arraySplice[a;1;1] → ["1"]
```

## Example

```bdfd
$arrayLoad[a;,;3,1,2]
$sendMessage[$arraySplice[a;1;1]]
```
