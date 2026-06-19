---
layout: doc
title: $blacklistUsers
translation_key: docs
category: "Moderation"
function_name: blacklistUsers
syntax: $blacklistUsers[userID1;userID2;...;(errorMessage)]
description: Guard function that blacklists users by ID. Alias of $blacklistIDs. The command is interrupted if the user is in the list.
---

# $blacklistUsers

The guard function `$blacklistUsers` blocks the execution of the command for the listed users. This is a direct alias of `$blacklistIDs`.

## Syntax

```
$blacklistUsers[userID1;userID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `userID1;userID2;...` | Snowflake[] | IDs of users to blacklist. |
| `errorMessage` | String (optional) | Message sent to the blacklisted user. |

## Behavior

- If the user is in the list, the command is interrupted.
- If an error message is provided, it is sent before the interruption.
- Exact alias of `$blacklistIDs`.

## Examples

### Blacklist with message

```bdfd
$blacklistUsers[111111111111111111;222222222222222222;❌ You are blacklisted.]
$sendMessage[Access allowed.]
```

### Silent blacklist

```bdfd
$blacklistUsers[123456789012345678]
$sendMessage[OK.]
```

## Notes

- `$blacklistUsers` and `$blacklistIDs` are interchangeable.
- To blacklist roles, use `$blacklistRoles`.
- To whitelist (only allow certain users), use `$onlyForUsers`.
