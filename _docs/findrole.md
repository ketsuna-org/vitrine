---
layout: doc
title: $findRole
translation_key: docs
category: "Entity Info"
function_name: findRole
syntax: $findRole[query;(guildID)]
description: Searches for a role by partial or full name and returns its ID. Case-insensitive.
---

# $findRole

The `$findRole` function searches for a Discord role by its **partial or full name** and returns its ID. The search is case-insensitive.

## Syntax

```
$findRole[query;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `query` | The name or part of the name of the role to search for. |
| `guildID` | Optional. The ID of the target server. |

## Return Value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the role found, or an empty string (`""`) if none is found. |

## Examples

### Partial Name Search

```bdfd
$sendMessage[Role matching "mod": $findRole[mod]]
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
$if[$findRole[admin]!=]
  $sendMessage[Role found: $roleName[$findRole[admin]]]
$else
  $sendMessage[No role matches "admin".]
$endif
```

### Fallback with $roleID

```bdfd
$if[$roleID[Moderator]!=]
  $sendMessage[Exact ID: $roleID[Moderator]]
$else
  $sendMessage[Extended search: $findRole[mod]]
$endif
```

## Notes

- If multiple roles match, the **first** one found is returned.
- For an exact search, use `$roleID` instead.
- Very useful when the exact name of the role is uncertain.
