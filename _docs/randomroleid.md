---
layout: doc
title: $randomRoleID[]
translation_key: docs
category: "Math & Text"
function_name: randomRoleID
syntax: $randomRoleID[(guildID)]
description: Returns the ID of a random role of the current server, or of the server given as an argument.
---

# $randomRoleID[]

The `$randomRoleID[]` function returns the Discord ID of a random role of a server.

## Syntax

```
$randomRoleID[(guildID)]
```

## Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `guildID` | No | ID of the server to pick from. Omitted or empty: the current server. |

## Return Value

- The Discord ID (snowflake) of a random role, as a string.
- Returns an empty string if the server has no role.
- Throws `Invalid guild ID.` if `guildID` is not empty and is not a positive number.

## Behavior

- All roles returned by Discord for the server are candidates, so `@everyone` can be picked.
- Each role has the same chance of being picked.

## Examples

### Get a random role ID

```bdfd
Random role ID: $randomRoleID
```

### Mention a random role

```bdfd
Random role: <@&$randomRoleID>
```
