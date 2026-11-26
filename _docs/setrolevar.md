---
layout: doc
title: $setRoleVar[]
translation_key: docs
category: "Variables"
function_name: setRoleVar
syntax: $setRoleVar[name;value;roleID]
description: "Stores a value in a variable of a role."
---
# $setRoleVar — Stores a value in a variable of a role.

## Syntax

```
$setRoleVar[name;value;roleID]
```

## Parameters

- **name** *(String, required)* — Variable name
- **value** *(String, required)* — Value
- **roleID** *(String, required)* — Role ID

## Return Value

- String.

## Usage

```
$setRoleVar[name;value;roleID] → result
```

## Example

```bdfd
$sendMessage[$setRoleVar[name;value;roleID]]
```
