---
layout: doc
title: $roleID
translation_key: docs
category: "Entity Info"
function_name: roleID
syntax: $roleID[name]
description: Returns the ID of a Discord role from its exact name in the current server.
---

# $roleID

The function `$roleID` returns the **ID** of a Discord role from its **name**. The name must match exactly (case-sensitive) and be unique among the roles of the server.

## Syntax

```
$roleID[name]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | The exact name of the role (case-sensitive). Required. An empty name returns `""`. |

## Return Value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the role, or `""` if no role or several roles have this name. |

## Examples

### Get the ID of a role

```bdfd
$sendMessage[ID of the Admin role: $roleID[Admin]]
```

### Check if a role exists

```bdfd
$if[$roleID[Member]!=]
  $sendMessage[The Member role exists!]
$else
  $sendMessage[Member role not found.]
$endif
```

## Notes

- If several roles have the exact same name, the function returns an empty string.
- A mention (`<@&id>`) is not resolved: the argument is compared to role names only.
- Use `$findRole` to look up a role from a name, an ID or a mention.
