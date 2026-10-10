---
layout: doc
title: $usersWithRole
translation_key: docs
category: "Entity Info"
function_name: usersWithRole
syntax: $usersWithRole[roleID;(separator);(guildID)]
description: Returns the IDs of the members of the current server who have a role, joined by a separator (default ", "). The guildID argument is accepted but ignored.
---
# $usersWithRole

The `$usersWithRole` function returns the **IDs of the members** of the current server who have a given role.

## Syntax

```
$usersWithRole[roleID;(separator);(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | Required. The ID of the role. Surrounding spaces are removed; the value is compared as text with the role IDs of each member and is not validated (an unknown ID simply matches nobody). |
| `separator` | Optional. Text placed between two IDs, used as written (spaces are kept). Default: `, ` (comma and space). |
| `guildID` | Optional, **ignored**. The engine accepts a third argument but always searches the server of the current command. |

## Return Value

| Type | Description |
|---|---|
| `string` | The user IDs of the members who have the role, joined by `separator`. An empty string if nobody has it. |

## Behavior

- All the members of the current server are read (in pages of 1000) and filtered; the result has IDs only, not names or mentions.
- Bots are included if they have the role.

## Examples

### List the IDs of the admins

```bdfd
$sendMessage[**Administrators:** $usersWithRole[$roleID[Admin]]]
```

### List the member IDs of a role, one per line

```bdfd
$sendMessage[
**Members with the VIP role:**
$usersWithRole[$roleID[VIP];
]]
```

### Count members

```bdfd
$textSplit[$usersWithRole[$roleID[Member]];, ]
$sendMessage[There are $getTextSplitLength members with the Member role.]
```

(an empty result gives one empty element, so the count would be `1` when nobody has the role; test for an empty result first)

### Check if a role is empty

```bdfd
$if[$usersWithRole[$roleID[Old]]==]
  $sendMessage[No member has the Old role.]
$endif
```

## Notes

- Members are returned as user IDs joined by the separator.
- Useful for targeted announcements or community management.
