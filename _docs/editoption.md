---
layout: doc
title: $editOption[]
translation_key: docs
category: "Components & Interactions"
function_name: editOption
syntax: $editOption[name;newname;(description);(value);(emoji);(default)]
description: "Edits a select menu option"
---
# $editOption — Edits a select menu option

## Syntax

```
$editOption[name;newname;(description);(value);(emoji);(default)]
```

## Parameters

- **name** *(text, required)* — The option name to find
- **newname** *(text, required)* — The new option name
- **description** *(text, optional)* — The new description for this option
- **value** *(text, optional)* — The new value for this option
- **emoji** *(text, optional)* — The new emoji for this option
- **default** *(boolean, optional)* — Whether to set this option as default

## Return Value

- String.

## Usage

```
$editOption[name;newname;(description);(value);(emoji);(default)] → result
```

## Example

```bdfd
$addStringSelectMenu[menu]$addOption[One;First;one]$editOption[One;Uno;Premier;uno;;true]
```
