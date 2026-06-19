---
layout: doc
title: $randomRoleID[]
translation_key: docs
category: "Math & Text"
function_name: randomRoleID
syntax: $randomRoleID
description: Returns the ID of a random role present on the server.
---

# $randomRoleID[]

The `$randomRoleID[]` function returns the Discord ID of a random role present on the server.

## Syntax

```
$randomRoleID
```

> **Note:** This function takes no parameters.

## Return Value

The Discord ID (snowflake) of a random role on the server, as a string.

## Examples

### Get a random role ID

```bdfd
Random role ID: $randomRoleID
```

### Mention a random role

```bdfd
Random role: <@&$randomRoleID>
```

### Assign a random role

```bdfd
$giveRole[$authorID;$randomRoleID]
```

## Notes

- The role is chosen from all roles on the server, including the `@everyone` role.
- The bot must have the manage roles permission to use `$giveRole[]`.
