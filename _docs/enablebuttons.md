---
layout: doc
title: $enableButtons[]
translation_key: docs
category: "Components & Interactions"
function_name: enableButtons
syntax: $enableButtons[index]
description: "Enables all buttons on the current message"
---
# $enableButtons — Enables all buttons on the current message

## Syntax

```
$enableButtons[index]
```

## Parameters

- **index** *(number, required)* — The index of the row to enable

## Return Value

- String.

## Usage

```
$enableButtons[index] → result
```

## Example

```bdfd
$addButton[yes;a;Ok;primary;yes]$enableButtons
```
