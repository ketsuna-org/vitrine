---
layout: doc
title: $roleCount
translation_key: docs
category: "Entity Info"
function_name: roleCount
syntax: $roleCount
description: Returns the total number of roles on the Discord server.
---

# $roleCount

The function `$roleCount` returns the **total number of roles** present on the Discord server, including the `@everyone` role.

## Syntax

```
$roleCount
```

The function takes no argument.

## Parameters

This function takes no parameter; it always counts the roles of the current server.

## Return Value

| Type | Description |
|---|---|
| `integer` | The number of roles on the server. |

## Examples

### Number of roles

```bdfd
$sendMessage[This server has $roleCount roles.]
```

### Server statistics

```bdfd
$sendMessage[
**Server Stats:**
Members: $memberCount
Roles: $roleCount
Channels: $channelCount
]
```

### Check role limit

```bdfd
$if[$roleCount>=250]
  $sendMessage[⚠️ Warning: This server has a lot of roles.]
$endif
```

## Notes

- Includes the `@everyone` role in the count.
- The roles are listed from Discord for the current server (`guild.id`).
