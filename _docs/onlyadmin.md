---
layout: doc
title: $onlyAdmin
translation_key: docs
category: "Moderation"
function_name: onlyAdmin
syntax: $onlyAdmin[errorMessage]
description: A guard function that stops command execution if the author is not an administrator of the server, optionally sending an error message.
---

# $onlyAdmin

The guard function `$onlyAdmin` immediately stops the execution of the command if the user who triggered it does not have the **Administrator** permission on the server.

## Syntax

```
$onlyAdmin[errorMessage]
```

## Parameters

| Parameter | Description |
|---|---|
| `errorMessage` | Required (may be empty: `$onlyAdmin[]`). Message returned when the author is not an administrator. |

A bare `$onlyAdmin` (no brackets) is invalid: it takes exactly one argument.

## Behavior

- If the user is an administrator, the command continues normally.
- If the author is **not** an administrator, the command is immediately interrupted (implicit `$stop`) and `errorMessage` is output in place of the response.
- With an empty `errorMessage` nothing is displayed.
- The check reads the effective permissions of the author in the server (`Administrator`).

## Examples

### Restricting a command to administrators

```bdfd
$onlyAdmin[Only administrators can use this command.]
$ban[Moderation]
$sendMessage[<@$mentioned[1;no]> was banned.]
```

### Administration Panel

```bdfd
$onlyAdmin[]
$title[⚙️ Admin Panel]
$description[
**Available Commands:**
`!ban`, `!kick`, `!mute`, `!config`
]
$color[#ED4245]
```

### Hybrid Command (Admin or Moderator role)

```bdfd
$if[$isAdmin[$authorID]==false]
  $onlyForRoleIDs[123456789012345678;Permission denied.]
$endif
$sendMessage[Moderation action allowed.]
```

## Notes

- `$onlyAdmin` only checks the `Administrator` permission. To check other permissions, use `$onlyPerms`.
- Place this function at the **very top** of the command, before any other logic.
