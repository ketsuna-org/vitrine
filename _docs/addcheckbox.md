---
layout: doc
title: $addCheckbox[]
translation_key: docs
category: "Components & Interactions"
function_name: addCheckbox
syntax: $addCheckbox[customID;(default)]
description: "Adds a new checkbox component to the newest modal label"
---
# $addCheckbox — Adds a new checkbox component to the newest modal label

## Syntax

```
$addCheckbox[customID;(default)]
```

## Parameters

- **customID** *(id, required)* — The custom id for this field
- **default** *(boolean, optional)* — Whether this field is checked by default

## Return Value

- String.

## Usage

```
$addCheckbox[customID;(default)] → result
```

## Example

```bdfd
$newModal[form;Profile]$addLabel[Terms;;$addCheckbox[terms;true]]
```
