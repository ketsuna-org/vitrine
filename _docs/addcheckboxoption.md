---
layout: doc
title: $addCheckboxOption[]
translation_key: docs
category: "Components & Interactions"
function_name: addCheckboxOption
syntax: $addCheckboxOption[name;value;(description);(default)]
description: "Adds a new option to the newest checkbox group component"
---
# $addCheckboxOption — Adds a new option to the newest checkbox group component

## Syntax

```
$addCheckboxOption[name;value;(description);(default)]
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
$addCheckboxOption[name;value;(description);(default)] → result
```

## Example

```bdfd
$newModal[form;Profile]$addLabel[Tags;;$addCheckboxGroup[tags]$addCheckboxOption[A;a;First;true]]
```
