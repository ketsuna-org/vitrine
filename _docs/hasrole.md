---
layout: doc
title: $hasRole
translation_key: docs
category: "Math & Text"
function_name: hasRole
syntax: $hasRole[userID;roleID]
description: Checks if a user has a specific role on the server.
---

# $hasRole

The function `$hasRole[userID;roleID]` **checks if a user has a specific role** on the server. It is commonly used for permission systems.

## Syntax

```
$hasRole[userID;roleID]
```

Or with a single parameter (checks the author):

```
$hasRole[roleID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional - The ID of the user. Default: author of the command. |
| `roleID` | The ID of the role to check. Required. |

## Return Value

- **Type**: Boolean
- `true` if the user has the role.
- `false` if the role is not assigned, does not exist, or if the user is not found.

## Behavior

- Checks in the user's role list on the current server.
- Works only in a server context.
- Case-insensitive for the role name (if `$roleID[Name]` is used).

## Examples

### Admin Portal

```bdfd
$if[$hasRole[$authorID;$roleID[Admin]]==true]
  $title[🔧 Admin Panel]
  $description[
  Available commands:
  - `!ban <user>` - Ban a member
  - `!kick <user>` - Kick a member
  - `!warn <user> <reason>` - Warn
  ]
  $sendMessage[]
$else
  $sendEphemeral[❌ Access reserved for Administrators.]
$endif
```

### Staff Command

```bdfd
$if[$hasRole[$roleID[Staff]]==false]
  $sendMessage[❌ Permission denied. Staff role required.]
  $stop
$endif

;; Command executed
$ban[$mentioned[1];Banned by $userName]
$sendMessage[🔨 <@$mentioned[1]> was banned.]
```

### Multi-Role Check

```bdfd
$if[$hasRole[$mentioned[1];$roleID[Modo]]==true]
  $sendMessage[<@$mentioned[1]> is Moderator.]
$elseif[$hasRole[$mentioned[1];$roleID[Admin]]==true]
  $sendMessage[<@$mentioned[1]> is Administrator.]
$else
  $sendMessage[<@$mentioned[1]> is a standard member.]
$endif
```

### Role Badge

```bdfd
$if[$hasRole[$roleID[VIP]]==true]
  $var[badge;👑 VIP]
$elseif[$hasRole[$roleID[Booster]]==true]
  $var[badge;🚀 Booster]
$else
  $var[badge;👤 Member]
$endif

$sendMessage[$var[badge] $userName]
```

## Notes

- `$hasRole[userID;roleID]` requires the bot to be able to see the server's roles.
- To assign a role, use `$giveRole[]` or `$giveRoles[]`.
- To remove a role, use `$takeRole[]` or `$takeRoles[]`.
- `$hasRole` is often used as a guard at the beginning of commands with `$stop`.
