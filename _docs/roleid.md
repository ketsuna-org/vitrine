---
layout: doc
title: $roleID
translation_key: docs
category: "Entity Info"
function_name: roleID
syntax: $roleID[name;(guildID)]
description: Returns the ID of a Discord role from its name or mention. Case-insensitive.
---

# $roleID

The function `$roleID` returns the **ID** of a Discord role from its **name** or **mention**. The search is case-insensitive.

## Syntax

```
$roleID[name;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | The name of the role or a raw mention (`<@&id>`). |
| `guildID` | Optional. The ID of the target server. If omitted, the current server is used. |

## Return Value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the role, or `""` if not found. |

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

### From a mention

```bdfd
$sendMessage[ID extracted from the mention: $roleID[<@&123456789012345678>]]
```

### On another server

```bdfd
$sendMessage[Role ID on another server: $roleID[Mod;987654321098765432]]
```

## Notes

- If multiple roles have the exact same name, only the first found is returned.
- A raw mention (`<@&id>`) is accepted as a parameter.
- Use `$findRole` for a partial name search.
