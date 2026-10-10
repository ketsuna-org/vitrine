---
layout: doc
title: $colorRole
translation_key: docs
category: "Entity Info"
function_name: colorRole
syntax: $colorRole[color]
description: Sets the color of the first role mentioned in the message.
---

# $colorRole

The `$colorRole` function **changes the color** of the first role mentioned in the command message. It does not return anything.

## Syntax

```
$colorRole[color]
```

## Parameters

| Parameter | Description |
|---|---|
| `color` | Required. The new color, as hex (`#5865F2`, or hex digits) or as a decimal number between 0 and 16777215. An invalid color raises `Invalid role color.` |

## Return value

| Type | Description |
|---|---|
| `string` | An empty string. The color of the role is modified. |

## Examples

### Change the color of a role

```bdfd
$colorRole[#E74C3C]
$sendMessage[The role color has been changed.]
```

### Color given by the user

```bdfd
$colorRole[$message[2]]
$sendMessage[Color updated.]
```
Usage: `!color @Role #3498DB`

## Notes

- The role to modify is the first role mentioned in the message. If no role is mentioned, the function raises `Missing or invalid role ID.`
- To read the color of a role, use `$getRoleColor`; to change several properties at once, use `$modifyRole`.
