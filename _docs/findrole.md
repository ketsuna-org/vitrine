---
layout: doc
title: $findRole
translation_key: docs
category: "Entity Info"
function_name: findRole
syntax: $findRole[query]
description: Searches for a role by ID, role mention or exact name and returns its ID. Case-sensitive on names.
---

# $findRole

The `$findRole` function searches for a Discord role by its **ID, mention or exact name** and returns its ID. Name matching is exact and case-sensitive (no partial match).

## Syntax

```
$findRole[query]
```

## Parameters

| Parameter | Description |
|---|---|
| `query` | Required (exactly one argument). A role ID, a role mention (`<@&ID>`), or the exact name of the role. If empty, an empty string is returned. |

There is no `guildID` parameter.

## Return Value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the role found, or an empty string (`""`) if none is found. |

## Examples

### Search by exact name

```bdfd
$sendMessage[Role named "Moderator": $findRole[Moderator]]
```

### Assign a found role

```bdfd
$if[$findRole[VIP]!=]
  $roleGrant[$authorID;$findRole[VIP]]
  $sendMessage[VIP role assigned!]
$else
  $sendMessage[VIP role not found.]
$endif
```

### Verify Existence

```bdfd
$if[$findRole[Admin]!=]
  $sendMessage[Role found: $roleName[$findRole[Admin]]]
$else
  $sendMessage[No role named "Admin".]
$endif
```

### Fallback with $roleID

```bdfd
$if[$roleID[Moderator]!=]
  $sendMessage[Exact ID: $roleID[Moderator]]
$else
  $sendMessage[Not found by name; trying as ID or mention: $findRole[$message[1]]]
$endif
```

## Notes

- A mention that matches no role returns an empty string; a numeric query that matches no role ID is then tried as a role name.
- If multiple roles share the exact name, the **first** one found is returned (`$roleID` returns an empty string when the name is ambiguous).
- Partial names are not matched.
