---
layout: doc
title: $disableButtons[]
translation_key: docs
category: "Components & Interactions"
function_name: disableButtons
syntax: $disableButtons[index]
description: "Disables all buttons on the current message"
---
# $disableButtons — Disables all buttons on the current message

## Syntax

```
$disableButtons[index]
```

## Parameters

- **index** *(number, required)* — The index of the row to disable

## Return Value

- String.

## Usage

```
$disableButtons[index] → result
```

## Example

```bdfd
$addButton[yes;a;Ok;primary]$addButton[yes;b;No;secondary]$disableButtons[1]
```
