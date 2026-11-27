---
layout: doc
title: $addLabel[]
translation_key: docs
category: "Components & Interactions"
function_name: addLabel
syntax: $addLabel[name;(description);component]
description: "Adds a new label component to the modal"
---
# $addLabel — Adds a new label component to the modal

## Syntax

```
$addLabel[name;(description);component]
```

## Parameters

- **name** *(text, required)* — The name for the label
- **description** *(text, optional)* — The description for the label
- **component** *(text, required)* — The component to attach to the label

## Return Value

- String.

## Usage

```
$addLabel[name;(description);component] → result
```

## Example

```bdfd
$newModal[form;Profile]$addLabel[Plan;Pick one;$addRadioGroup[plan;true]$addRadioOption[Basic;basic;Basic plan;true]]
```
