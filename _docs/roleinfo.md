---
layout: doc
title: $roleInfo
translation_key: docs
category: "Entity Info"
function_name: roleInfo
syntax: $roleInfo[format]
description: Writes the information of the first role mentioned in the message into the embed description, using a format with placeholders.
---

# $roleInfo

The function `$roleInfo` takes the **first role mentioned** in the triggering message and writes its information into the **embed description**, using the `format` text you provide. It returns no text.

## Syntax

```
$roleInfo[format]
```

## Parameters

| Parameter | Description |
|---|---|
| `format` | Description template. Required. The placeholders below are replaced (case-insensitive). 4096 characters maximum. |

## Placeholders

| Placeholder | Replaced by |
|---|---|
| `{name}` | Name of the role |
| `{id}` | ID of the role |
| `{mentionable}` | `true` or `false` |
| `{hoist}` | `true` or `false` (role displayed separately) |
| `{color}` | Color in hexadecimal, 6 uppercase digits without `#` |
| `{position}` | Rank in the hierarchy (1 = highest role) |

## Return Value

This function does not return any text. It sets the description of the embed.

## Errors

- "A role mention is required." if the message does not mention a role.
- "Role not found." if the mentioned role does not exist on the current server.
- "Description cannot exceed 4096 characters." if the formatted text is too long.

## Examples

### Basic Information

```bdfd
$roleInfo[**Role:** {name}
**ID:** {id}
**Color:** {color}
**Position:** {position}]
```

### Display options

```bdfd
$title[Role information]
$roleInfo[Mentionable: {mentionable} | Displayed separately: {hoist}]
```

## Notes

- To read a single property from a role ID, use `$roleName[]`, `$rolePosition[]` or `$rolePerms[]`.
