---
layout: doc
title: $addOption[]
translation_key: docs
category: "Components & Interactions"
function_name: addOption
syntax: $addOption[name;(description);value;(emoji);(default)]
description: "Adds a select menu option"
---
# $addOption — Adds a select menu option

## Syntax

```
$addOption[name;(description);value;(emoji);(default)]
```

## Parameters

- **name** *(text, required)* — The option name
- **description** *(text, optional)* — The description for this option
- **value** *(text, required)* — The value to use for this option
- **emoji** *(text, optional)* — The emoji to use for this option
- **default** *(boolean, optional)* — Whether to set this option as default

## Return Value

- String.

## Usage

```
$addOption[name;(description);value;(emoji);(default)] → result
```

## Example

```bdfd
$addStringSelectMenu[menu]$addOption[One;First;one]$addOption[Two;;two;;true]
```
