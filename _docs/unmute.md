---
layout: doc
title: $unmute
translation_key: docs
category: "Moderation"
function_name: unmute
syntax: $unmute[roleName]
description: Removes a role, identified by its name, from the user(s) mentioned in the message (role-based unmute).
---

# $unmute

The function `$unmute[]` is the counterpart of `$mute`: it **removes the server role** whose name is `roleName` from the user(s) mentioned in the command message. It does not take a user ID and does not touch Discord's voice mute or timeout.

## Syntax

```
$unmute[roleName]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleName` | Required. The exact name of the role to remove (case-sensitive). An error is raised if no role has this name. |

## Return Value

None (empty string). The role is removed from each mentioned user.

## Behavior

- The users are taken from the user mentions of the command message. If the message mentions no user, an error is raised (the author is never used as a fallback).
- The role is looked up by exact name among the roles of the server; if none matches, the error `Role not found: <name>.` is raised.
- The bot must have `Manage Roles` and the role must be below the bot's highest role; `@everyone` and managed (bot, integration, booster) roles cannot be removed. Otherwise a permission error is raised.
- `$unmute` accepts exactly one argument.

## Examples

### Simple unmute

```bdfd
$unmute[Muted]
$sendMessage[<@$mentioned[1]> can speak again.]
```

### Conditional unmute

```bdfd
$if[$isAdmin[$authorID]==true]
  $unmute[Muted]
  $sendMessage[Member unmuted.]
$else
  $sendMessage[Permission denied.]
$endif
```

## Notes

- Use the same role name that was given to `$mute`.
- To remove a timeout, use `$unTimeout`.
