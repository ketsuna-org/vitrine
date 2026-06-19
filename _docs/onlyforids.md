---
layout: doc
title: $onlyForIDs
translation_key: docs
category: "Moderation"
function_name: onlyForIDs
syntax: $onlyForIDs[userID1;userID2;...;(errorMessage)]
description: A guard function that stops execution if the user's ID is not in the list of allowed IDs. Alias of $onlyForUsers.
---

# $onlyForIDs

The guard function `$onlyForIDs` restricts the execution of a command to a specific list of user IDs. It is a direct alias of `$onlyForUsers` — both functions are interchangeable.

## Syntax

```
$onlyForIDs[userID1;userID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `userID1;userID2;...` | Snowflake[] | Discord IDs of allowed users. |
| `errorMessage` | String (optional) | The message sent to users who are not allowed. |

## Behavior

- Compares the ID of the triggering user (`$authorID`) with the list.
- If the ID matches, the command execution continues.
- If the ID does not match, the command execution is halted.
- Functionally identical to `$onlyForUsers`.

## Examples

### Owner-only command

```bdfd
$onlyForIDs[$botOwnerID;❌ Only the owner can use this command.]
$eval[$message]
```

### Multiple allowed IDs

```bdfd
$onlyForIDs[111111111111111111;222222222222222222;333333333333333333]
$sendMessage[Access allowed.]
```

### Informative error message

```bdfd
$onlyForIDs[123456789012345678;❌ This command is undergoing maintenance. Only the developer can use it.]
```

## Notes

- `$onlyForIDs` and `$onlyForUsers` are **strictly identical**. Use whichever is more readable in your context.
- Enable **Developer Mode** in Discord (User Settings → Advanced) to copy IDs.
- For blacklisting IDs, use `$blacklistIDs`.
- If you want to allow an entire role rather than specific users, use `$onlyForRoles`.
