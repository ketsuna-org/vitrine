---
layout: doc
title: $roleNames
translation_key: docs
category: "Entity Info"
function_name: roleNames
syntax: $roleNames
description: Returns the list of all role names of the current server, separated by commas.
---

# $roleNames

The function `$roleNames` returns the **complete list of names** of all roles on the server, separated by a comma (`,`, without space).

## Syntax

```
$roleNames
```

The function takes no argument.

## Parameters

This function takes no parameter; the separator is always `,` and the server is always the current one.

## Return Value

| Type | Description |
|---|---|
| `string` | All role names joined with `,`. |

## Examples

### Simple list

```bdfd
$sendMessage[**Roles on the server:** $roleNames]
```

### Count and list

```bdfd
$sendMessage[The server has $roleCount roles: $roleNames]
```

## Notes

- The `@everyone` role is generally included in the list.
- Roles are listed in the order returned by Discord; no hierarchy sort is applied.
- A role name containing a comma cannot be told apart from the separator.
