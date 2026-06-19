---
layout: doc
title: $roleNames
translation_key: docs
category: "Entity Info"
function_name: roleNames
syntax: $roleNames[(separator);(guildID)]
description: Returns a list of all role names on the server, separated by a customizable delimiter.
---

# $roleNames

The function `$roleNames` returns the **complete list of names** of all roles on the server, separated by a customizable delimiter.

## Syntax

```
$roleNames[(separator);(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Optional. The separator between each role name. Default: `, `. |
| `guildID` | Optional. The ID of the target server. Default: current server. |

## Return Value

| Type | Description |
|---|---|
| `string` | All role names concatenated with the chosen separator. |

## Examples

### Simple list

```bdfd
$sendMessage[**Roles on the server:** $roleNames]
```

### List with line breaks

```bdfd
$sendMessage[**List of roles:**
$roleNames[
]]
```

### With custom separator

```bdfd
$sendMessage[Roles: $roleNames[ | ]]
```

### Count and list

```bdfd
$sendMessage[The server has $roleCount roles: $roleNames[, ]]
```

## Notes

- The `@everyone` role is generally included in the list.
- Roles are listed according to their hierarchical order (from highest to lowest).
- To get IDs instead of names, use a different approach.
