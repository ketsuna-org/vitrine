---
layout: doc
title: $roleInfo
translation_key: docs
category: "Entity Info"
function_name: roleInfo
syntax: $roleInfo[roleID;property;(guildID)]
description: Returns a specific property of a Discord role.
---

# $roleInfo

The function `$roleInfo` returns a **specific property** of a Discord role. It allows you to access various information such as the name, color, position, or permissions.

## Syntax

```
$roleInfo[roleID;property;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the target role. Required. |
| `property` | The property to retrieve (see below). Required. |
| `guildID` | Optional. The ID of the target server. |

## Properties Available

| Property | Description | Return Type |
|---|---|---|
| `name` | Name of the role | `string` |
| `color` | Color in hexadecimal | `string` |
| `position` | Hierarchical position | `integer` |
| `permissions` | Raw permissions | `integer` |
| `mentionable` | Whether the role is mentionable | `string` (`"true"`/`"false"`) |
| `hoist` | Whether the role is displayed separately | `string` (`"true"`/`"false"`) |
| `managed` | Whether the role is managed by an integration | `string` (`"true"`/`"false"`) |
| `id` | ID of the role | `snowflake` |

## Return Value

The type depends on the requested property (string, integer, or boolean represented as a string).

## Examples

### Basic Information

```bdfd
$sendMessage[
**Role:** $roleInfo[$roleID[Admin];name]
**Color:** $roleInfo[$roleID[Admin];color]
**Position:** $roleInfo[$roleID[Admin];position]
]
```

### Check if a role is displayed separately

```bdfd
$if[$roleInfo[$roleID[Admin];hoist]==true]
  $sendMessage[This role is displayed separately in the member list.]
$endif
```

### Role managed by an integration

```bdfd
$if[$roleInfo[123456789012345678;managed]==true]
  $sendMessage[This role is managed by an integration (bot).]
$endif
```

## Notes

- The properties `mentionable`, `hoist`, and `managed` return strings `"true"` or `"false"`.
- For permissions, the raw integer format is returned. Use `$rolePerms` for a more readable format.
