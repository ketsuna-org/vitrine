---
layout: doc
title: $userRoleNames[]
translation_key: docs
category: "Server Helpers"
function_name: userRoleNames
syntax: $userRoleNames[userID;(separator)]
description: "Names of the roles a member holds, from the highest to the lowest, without `@everyone`."
---
# $userRoleNames — Names of the roles a member holds, from the highest to the lowest, without `@everyone`

## Syntax

```
$userRoleNames[userID;(separator)]
```

## Parameters

- **userID** *(ID, required)* — The member.
- **separator** *(text, optional)* — Default: `, `.

## Return Value

- string: empty when the user has no role or is not a member.

## Usage

```
$userRoleNames[1] → "Mod, Fan"
$userRoleNames[1;|] → "Mod|Fan"
```

## Important Notes

- `$userRoles` returns the names too, one per line; this one lets you pick the separator.

## Example

```bdfd
$sendMessage[$userRoleNames[1]]
```
