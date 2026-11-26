---
layout: doc
title: $addCheckboxGroup[]
translation_key: docs
category: "Components & Interactions"
function_name: addCheckboxGroup
syntax: $addCheckboxGroup[customID;(minoptions);(maxoptions);(required)]
description: "Adds a new checkbox group component to the newest modal label"
---
# $addCheckboxGroup — Adds a new checkbox group component to the newest modal label

## Syntax

```
$addCheckboxGroup[customID;(minoptions);(maxoptions);(required)]
```

## Parameters

- **customID** *(id, required)* — The custom id for this field
- **minoptions** *(number, optional)* — The min options that can be selected
- **maxoptions** *(number, optional)* — The max options that can be selected
- **required** *(boolean, optional)* — Whether selecting an option is required

## Return Value

- String.

## Usage

```
$addCheckboxGroup[customID;(minoptions);(maxoptions);(required)] → result
```

## Example

```bdfd
$newModal[form;Profile]$addLabel[Tags;;$addCheckboxGroup[tags;0;2;false]$addCheckboxOption[A;a;;true]]
```
