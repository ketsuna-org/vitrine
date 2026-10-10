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

Both arguments are required: `$hasRole[roleID]` with a single argument is refused ("Invalid argument count"). To check the author, pass `$authorID` as the first argument.

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Required. The ID of the user (a positive integer, otherwise the error "Invalid user ID." is raised). |
| `roleID` | Required. The ID of the role to check. An empty value returns `false`; any other non-numeric value raises the error "Invalid role ID.". |

## Return Value

- **Type**: Boolean
- `true` if the user has the role.
- `false` if the role is not assigned to the user, if the role ID is empty (for example `$roleID[Name]` found no unique role), or if the user is not a member of the server (a "member not found" answer is treated as "no roles").
- The `@everyone` role (whose ID is the server ID) is reported as `true` for any user.

## Behavior

- Looks in the user's role list on the current server, matching the role by its ID.
- Works only in a server context (the lookup needs a server).
- A role that does not exist in the server and is not held by the user gives `false`, not an error, as long as the ID is numeric.
- `$roleID[Name]` matches the role name exactly (case-sensitive) and returns an empty text when no role, or several roles, have that name; `$hasRole` then returns `false`.

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
$else
  $ephemeral
  ❌ Access reserved for Administrators.
$endif
```

### Staff Command

```bdfd
$if[$hasRole[$authorID;$roleID[Staff]]==false]
  $sendMessage[❌ Permission denied. Staff role required.]
  $stop
$endif

$c[Command executed]
$banID[Banned by $userName;$mentioned[1]]
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
$if[$hasRole[$authorID;$roleID[VIP]]==true]
  $var[badge;👑 VIP]
$elseif[$hasRole[$authorID;$roleID[Booster]]==true]
  $var[badge;🚀 Booster]
$else
  $var[badge;👤 Member]
$endif

$sendMessage[$var[badge] $userName]
```

## Notes

- The result is read from Discord: the bot must be able to read the server's roles and members.
- To assign a role, use `$giveRole[]` or `$giveRoles[]`.
- To remove a role, use `$takeRole[]` or `$takeRoles[]`.
- `$hasRole` is often used as a guard at the beginning of commands with `$stop`.
