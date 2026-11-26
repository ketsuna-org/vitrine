---
layout: doc
title: $addRadioGroup[]
translation_key: docs
category: "Components & Interactions"
function_name: addRadioGroup
syntax: $addRadioGroup[customID;(required)]
description: "Adds a new radio group component to the newest modal label"
---
# $addRadioGroup — Adds a new radio group component to the newest modal label

## Syntax

```
$addRadioGroup[customID;(required)]
```

## Parameters

- **customID** *(id, required)* — The custom id for this field
- **required** *(boolean, optional)* — Whether selecting an option is required

## Return Value

- String.

## Usage

```
$addRadioGroup[customID;(required)] → result
```

## Example

```bdfd
$newModal[form;Profile]$addLabel[Plan;;$addRadioGroup[plan;false]$addRadioOption[Basic;basic]]
```
