---
layout: doc
title: $blacklistIDs
translation_key: docs
category: "Moderation"
function_name: blacklistIDs
syntax: $blacklistIDs[userID1;userID2;...;errorMessage]
description: Guard function that blacklists users by ID. If the triggering user ID is in the list, the command is interrupted.
---

# $blacklistIDs

The guard function `$blacklistIDs` blocks the execution of the command for users whose ID is in the list. Unlike `$onlyForIDs` which whitelists, `$blacklistIDs` acts as a **blacklist**.

## Syntax

```
$blacklistIDs[userID1;userID2;...;errorMessage]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `userID1;userID2;...` | Snowflake[] | IDs of users to blacklist, separated by `;`. At least one value is required (empty values are ignored). |
| `errorMessage` | String | **Required**, always the **last** argument. Message returned when the guard stops the command; it replaces the output of the script. Leave it empty (`;` at the end) for a silent stop. |

The function therefore needs at least 2 arguments. With a single argument, the call is rejected ("Invalid argument count").

## Behavior

- Compares the ID of the triggering user (`author.id`, or `user.id` when the former is absent) with each value (trimmed text comparison). No Discord request is made.
- If the context has no user ID at all, nothing matches and the command continues.
- If the ID matches one of the values, the script is stopped and the error message is used as output.
- If it matches none, the command continues.
- Empty values never match.

## Return Value

Returns an empty string when the command continues. When the guard stops the command, the script is stopped and the error message (last argument) is used as its output.

## Examples

### Simple blacklist

```bdfd
$blacklistIDs[123456789012345678;❌ You have been blacklisted from this command.]
$sendMessage[Processing completed.]
```

### Several IDs

```bdfd
$blacklistIDs[111111111111111111;222222222222222222;❌ Access revoked.]
$sendMessage[Welcome.]
```

### Silent stop (empty error message)

```bdfd
$blacklistIDs[111111111111111111;222222222222222222;]
$sendMessage[OK.]
```

## Notes

- `$blacklistIDs` compares user **IDs**; `$blacklistUsers` compares user **names** (not interchangeable).
- To blacklist an entire role, use `$blacklistRoles` (role names) or `$blacklistRolesIDs` (role IDs).
- The opposite of this function is `$onlyForIDs` (whitelist).
