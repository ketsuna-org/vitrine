---
layout: doc
title: $usersWithRole
translation_key: docs
category: "Entity Info"
function_name: usersWithRole
syntax: $usersWithRole[roleID;(separator);(guildID)]
description: Returns the list of members having a specific role, separated by a delimiter.
---

# $usersWithRole

The `$usersWithRole` function returns the **list of members** who have a specific role on the server.

## Syntax

```
$usersWithRole[roleID;(separator);(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role. Required. |
| `separator` | Optional. Separator between the members. Default: `, `. |
| `guildID` | Optional. The ID of the target server. |

## Return Value

| Type | Description |
|---|---|
| `string` | List of members having the role (format depends on configuration). |

## Examples

### List admins

```bdfd
$sendMessage[**Administrators:** $usersWithRole[$roleID[Admin]]]
```

### List with line breaks

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

### Check if a role is empty

```bdfd
$if[$usersWithRole[$roleID[Old]]==]
  $sendMessage[No member has the Old role.]
$endif
```

### Notify admins

```bdfd
$sendMessage[Administrator IDs: $usersWithRole[$roleID[Admin]]]
```

## Notes

- Members are returned as user IDs joined by the separator.
- The exact format may vary depending on the version of BDFD.
- Useful for targeted announcements or community management.
