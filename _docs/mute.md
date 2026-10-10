---
layout: doc
title: $mute
translation_key: docs
category: "Moderation"
function_name: mute
syntax: $mute[roleName]
description: Grants a role, identified by its name, to the user(s) mentioned in the message (role-based mute).
---

# $mute

The function `$mute[]` is a **role-based mute**: it gives the server role whose name is `roleName` to the user(s) mentioned in the command message. It does not apply the Discord voice mute; the effect of the mute depends on the permissions of the role you give (for example a role that cannot send messages).

## Syntax

```
$mute[roleName]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleName` | Required. The exact name of the role to grant (case-sensitive). An error is raised if no role has this name. |

## Return Value

None. The role is added to each mentioned user.

## Behavior

- The users are taken from the user mentions of the command message. If the message mentions no user, an error is raised (the author is never used as a fallback).
- The role is looked up by exact name among the roles of the server.
- The bot must be allowed to manage the role (the engine checks it and returns a permission error otherwise).
- There is no reason parameter: `$mute` accepts exactly one argument.

## Examples

### Simple Mute

```bdfd
$mute[Muted]
$sendMessage[<@$mentioned[1]> was muted.]
```

### Verification before mute

```bdfd
$if[$isAdmin[$authorID]==true]
  $mute[Muted]
  $sendMessage[Member muted.]
$else
  $sendMessage[Permission denied.]
$endif
```

## Notes

- Create beforehand a role (here `Muted`) whose permissions prevent speaking or writing, and keep its name identical to the one passed to `$mute`.
- To remove the role again, use `$unmute[roleName]`.
- For a temporary timeout, use `$timeout`.
