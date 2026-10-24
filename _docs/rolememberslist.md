---
layout: doc
title: $roleMembersList
translation_key: docs
category: "Entity Info"
function_name: roleMembersList
syntax: $roleMembersList[Role ID;(Separator;Return)]
description: Lists the members of the current server who have a role, as IDs, mentions or usernames.
---

# $roleMembersList

`$roleMembersList` returns the members of the current server who hold a given role.

## Syntax

```
$roleMembersList[Role ID;(Separator;Return)]
```

## Parameters

| Parameter | Description |
|---|---|
| `Role ID` | Required. The role ID (positive integer, otherwise "Invalid role ID."). |
| `Separator` | Optional. Text placed between entries. Default: `, `. |
| `Return` | Optional. `id` (default, also when empty), `mention` (`<@id>`) or `username`. Any other value raises "Return must be id, mention or username.". |

## Return value

- The matching members joined by the separator; an empty string if nobody has the role.

## Examples

### Mentions, one per line

```bdfd
Members: $roleMembersList[123456789012345678;\n;mention]
```

### IDs

```bdfd
$roleMembersList[123456789012345678]
```
