---
layout: doc
title: $deleteRoleVar[]
translation_key: docs
category: "Variables"
function_name: deleteRoleVar
syntax: $deleteRoleVar[name;roleID]
description: "Deletes the value stored for a role (it reads as the default again)."
---
# $deleteRoleVar — Deletes the value stored for a role (it reads as the default again).

## Syntax

```
$deleteRoleVar[name;roleID]
```

## Parameters

- **name** *(String, required)* — Variable name
- **roleID** *(String, required)* — Role ID

## Return Value

- String.

## Usage

```
$deleteRoleVar[name;roleID] → result
```

## Example

```bdfd
$sendMessage[$deleteRoleVar[name;roleID]]
```
