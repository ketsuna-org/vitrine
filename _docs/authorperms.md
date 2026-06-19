---
layout: doc
title: $authorPerms
translation_key: docs
category: "Moderation"
function_name: authorPerms
syntax: $authorPerms
description: Returns the list of permissions of the author of the command on the server. Useful for dynamically checking what the user can do.
---

# $authorPerms

The `$authorPerms` function **retrieves the list of permissions** that the author of the command has on the current server.

## Syntax

```
$authorPerms
```

## Parameters

No parameters.

## Return value

- **Type**: String
- List of permissions of the author, separated by `, `.
- Example: `SendMessages, ReadMessageHistory, AddReactions,...`

## Behavior

- Returns the effective permissions of the user (taking into account roles and channel permissions).
- Equivalent to `$userPerms[$authorID]`.
- Permission names are in English (Discord API format).

## Examples

### Permission verification

```bdfd
$if[$checkContains[$authorPerms;BanMembers]==true]
  $sendMessage[✅ You have permission to ban.]
$else
  $sendMessage[❌ Permission "Ban Members" is missing.]
$endif
```

### Debugging permissions

```bdfd
$title[🔑 Your Permissions]
$description[
$textSplit[$authorPerms;, ]
  $index. $splitText[$index]
$endTextSplit
]
$sendMessage[]
```

### Admin-only command

```bdfd
$if[$checkContains[$authorPerms;Administrator]==true]
  // Sensitive code executed
  $sendMessage[✅ Admin action performed.]
$elseif[$checkContains[$authorPerms;ManageGuild]==true]
  // Management permissions
  $sendMessage[✅ Management action performed.]
$else
  $sendMessage[❌ Insufficient permissions.]
$endif
```

### Multi-verification

```bdfd
$if[$checkContains[$authorPerms;KickMembers]==true]
  $if[$checkContains[$authorPerms;BanMembers]==true]
    $sendMessage[✅ You can kick AND ban.]
  $else
    $sendMessage[⚠️ You can kick but not ban.]
  $endif
$else
  $sendMessage[❌ No moderation permissions.]
$endif
```

## Notes

- Use `$checkContains[$authorPerms;Permission]` to test a specific permission.
- Permissions are returned in English (Discord API names).
- `$authorPerms` is a shortcut for `$userPerms[$authorID]`.
