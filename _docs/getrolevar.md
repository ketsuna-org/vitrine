---
layout: doc
title: $getRoleVar[]
translation_key: docs
category: "Variables"
function_name: getRoleVar
syntax: $getRoleVar[name;roleID;(default)]
description: "Value of a variable stored for a role (one value per role of the bot). The default is returned when nothing is stored."
---
# $getRoleVar — Value of a variable stored for a role (one value per role of the bot). The default is returned when nothing is stored.

## Syntax

```
$getRoleVar[name;roleID;(default)]
```

## Parameters

- **name** *(String, required)* — Variable name
- **roleID** *(String, required)* — Role ID
- **default** *(String, optional)* — Value returned when the variable is empty

## Return Value

- String.

## Usage

```
$getRoleVar[name;roleID;default] → result
```

## Example

```bdfd
$sendMessage[$getRoleVar[name;roleID;default]]
```
