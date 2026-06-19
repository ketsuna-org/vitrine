---
layout: doc
title: $memberPerms
translation_key: docs
category: "Entity Info"
function_name: memberPerms
syntax: $memberPerms
description: Returns the list of effective permissions of the member on the server. Equivalent to $userPerms.
---

# $memberPerms

The function `$memberPerms` returns the **list of effective permissions** of the member on the current server. It is equivalent to `$userPerms`.

## Syntax

```
$memberPerms
```

## Return Value

- **Type** : List of permission names, separated by commas
- Example: `SendMessages, ReadMessageHistory, AddReactions, ManageMessages`

## Behavior

- `$memberPerms` takes **no arguments**.
- Returns the combined permissions of all roles of the member, including channel overrides.
- Functionally identical to `$userPerms` for the triggering user.

## Examples

### Display permissions

```bdfd
$title[Permissions of $memberNick]
$description[
**Permissions of the member:**
$memberPerms
]
$color[#5865F2]
$sendMessage[]
```

### Moderation command

```bdfd
$if[$checkContains[$memberPerms;KickMembers]==true]
  $kick[$mentioned]
  $sendMessage[<@$mentioned> was kicked.]
$else
  $sendMessage[KickMembers permission required.]
$endif
```

## Notes

- `$memberPerms` and `$userPerms` are interchangeable.
- Permission names are in **English** (matching the Discord API nomenclature).
- For a simple check of administrator status, use `$isAdmin`.

