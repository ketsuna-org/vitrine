---
layout: doc
title: $deleteActionRow[]
translation_key: docs
category: "Components & Interactions"
function_name: deleteActionRow
syntax: $deleteActionRow[index]
description: "Deletes an action row or top level component at given index"
---
# $deleteActionRow — Deletes an action row or top level component at given index

## Syntax

```
$deleteActionRow[index]
```

## Parameters

- **index** *(number, required)* — The row index to delete

## Return Value

- String.

## Usage

```
$deleteActionRow[index] → result
```

## Example

```bdfd
$addButton[yes;a;Ok;primary]$addButton[yes;b;No;secondary]$deleteActionRow[0]
```
