---
layout: doc
title: $addRadioOption[]
translation_key: docs
category: "Components & Interactions"
function_name: addRadioOption
syntax: $addRadioOption[name;value;(description);(default)]
description: "Adds a new option to the newest radio group component"
---
# $addRadioOption — Adds a new option to the newest radio group component

## Syntax

```
$addRadioOption[name;value;(description);(default)]
```

## Parameters

- **name** *(text, required)* — The option name
- **value** *(text, required)* — The value to use for this option
- **description** *(text, optional)* — The description for this option
- **default** *(boolean, optional)* — Whether to set this option as default

## Return Value

- String.

## Usage

```
$addRadioOption[name;value;(description);(default)] → result
```

## Example

```bdfd
$newModal[form;Profile]$addLabel[Plan;;$addRadioGroup[plan]$addRadioOption[Basic;basic;Basic plan]]
```
