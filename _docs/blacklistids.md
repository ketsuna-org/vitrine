---
layout: doc
title: $blacklistIDs
translation_key: docs
category: "Moderation"
function_name: blacklistIDs
syntax: $blacklistIDs[userID1;userID2;...;(errorMessage)]
description: Guard function that blacklists users by ID. If the triggering user is in the list, the command is interrupted.
---

# $blacklistIDs

The guard function `$blacklistIDs` blocks the execution of the command for users whose ID is in the list. Unlike `$onlyForIDs` which whitelists, `$blacklistIDs` acts as a **blacklist**.

## Syntax

```
$blacklistIDs[userID1;userID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `userID1;userID2;...` | Snowflake[] | IDs of users to blacklist, separated by `;`. |
| `errorMessage` | String (optional) | Message sent to the blacklisted user. If omitted, it remains silent. |

## Behavior

- Compares the ID of the triggering user with the blacklist.
- If the ID matches, the command is interrupted.
- If an error message is provided, it is sent before the interruption.
- Without an error message, the guard is silent.

## Examples

### Simple blacklist

```bdfd
$blacklistIDs[123456789012345678;❌ You have been blacklisted from this command.]
$sendMessage[Processing completed.]
```

### Multiple blacklist with external list

```bdfd
$blacklistIDs[$getGlobalUserVar[blacklist];❌ Access revoked.]
$sendMessage[Welcome.]
```

### Without message (silent)

```bdfd
$blacklistIDs[111111111111111111;222222222222222222]
$sendMessage[OK.]
```

## Notes

- `$blacklistIDs` and `$blacklistUsers` are interchangeable.
- For a persistent blacklist, combine it with `$getGlobalUserVar` or `$getServerUserVar`.
- To blacklist an entire role, use `$blacklistRoles` or `$blacklistRoleIDs`.
- The opposite of this function is `$onlyForIDs` (whitelist).
