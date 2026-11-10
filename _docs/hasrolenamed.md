---
layout: doc
title: $hasRoleNamed[]
translation_key: docs
category: "Server Helpers"
function_name: hasRoleNamed
syntax: $hasRoleNamed[userID;roleName]
description: "Tells whether a member has a role, found by its name (not case sensitive)."
---
# $hasRoleNamed — Tells whether a member has a role, found by its name (not case sensitive)

## Syntax

```
$hasRoleNamed[userID;roleName]
```

## Parameters

- **userID** *(ID, required)* — The member.
- **roleName** *(text, required)* — The name of the role.

## Return Value

- `true` or `false`.

## Usage

```
$hasRoleNamed[1;mod] → "true"
```

## Example

```bdfd
$sendMessage[$hasRoleNamed[1;mod]]
```
