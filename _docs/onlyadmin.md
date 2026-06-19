---
layout: doc
title: $onlyAdmin
translation_key: docs
category: "Moderation"
function_name: onlyAdmin
syntax: $onlyAdmin
description: A guard function that stops command execution if the user is not an administrator of the server.
---

# $onlyAdmin

The guard function `$onlyAdmin` immediately stops the execution of the command if the user who triggered it does not have the **Administrator** permission on the server.

## Syntax

```
$onlyAdmin
```

## Parameters

No parameters. `$onlyAdmin` is used alone, without arguments.

## Behavior

- If the user is an administrator, the command continues normally.
- If the user is **not** an administrator, the command is immediately interrupted (implicit `$stop`).
- No error message is sent by default — the bot remains silent.
- Functional equivalent to `$onlyPerms[administrator]` but more readable and concise.

## Examples

### Restricting a command to administrators

```bdfd
$onlyAdmin
$ban[$mentioned[1]]
$sendMessage[<@$mentioned[1]> was banned.]
```

### Administration Panel

```bdfd
$onlyAdmin
$title[⚙️ Admin Panel]
$description[
**Available Commands:**
`!ban`, `!kick`, `!mute`, `!config`
]
$color[#ED4245]
$sendMessage[]
```

### Hybrid Command (Admin or Moderator role)

```bdfd
$if[$isAdmin==false]
  $onlyForRoles[123456789012345678]
$endif
$sendMessage[Moderation action allowed.]
```

## Notes

- `$onlyAdmin` only checks the `Administrator` permission. To check other permissions, use `$onlyPerms`.
- The owner of the server is implicitly an administrator and passes this guard.
- To add a custom error message, use `$onlyPerms[administrator;Error message]` instead.
- Place this function at the **very top** of the command, before any other logic.
