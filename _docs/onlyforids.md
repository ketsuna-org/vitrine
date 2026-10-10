---
layout: doc
title: $onlyForIDs
translation_key: docs
category: "Moderation"
function_name: onlyForIDs
syntax: $onlyForIDs[userID1;userID2;...;errorMessage]
description: A guard function that stops execution if the user's ID is not in the list of allowed IDs.
---

# $onlyForIDs

The guard function `$onlyForIDs` restricts the execution of a command to a specific list of user IDs. It compares **IDs**, unlike `$onlyForUsers` which compares usernames.

## Syntax

```
$onlyForIDs[userID1;userID2;...;errorMessage]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `userID1;userID2;...` | Snowflake[] | Discord IDs of allowed users. At least one value is required (empty values are ignored). |
| `errorMessage` | String | **Required**, always the **last** argument. Message returned when the guard stops the command; it replaces the output of the script. Leave it empty (`;` at the end) for a silent stop. |

The function therefore needs at least 2 arguments. With a single argument, the call is rejected ("Invalid argument count").

## Behavior

- Compares the ID of the triggering user (`author.id`, i.e. `$authorID`) with each value (trimmed text comparison).
- If the ID matches one of the values, the command continues.
- If the ID matches none (or the list contains only empty values), the script is stopped and the error message is used as output.

## Return Value

Returns an empty string when the command continues. When the guard stops the command, the script is stopped and the error message (last argument) is used as its output.

## Examples

### Owner-only command

```bdfd
$onlyForIDs[123456789012345678;❌ Only the owner can use this command.]
$sendMessage[Access granted.]
```

### Multiple allowed IDs

```bdfd
$onlyForIDs[111111111111111111;222222222222222222;333333333333333333;❌ Access denied.]
$sendMessage[Access allowed.]
```

### Silent stop

```bdfd
$onlyForIDs[123456789012345678;]
$sendMessage[Maintenance command.]
```

## Notes

- `$onlyForIDs` compares IDs and `$onlyForUsers` compares usernames: they are **not** interchangeable.
- Enable **Developer Mode** in Discord (User Settings → Advanced) to copy IDs.
- For blacklisting IDs, use `$blacklistIDs`.
- To allow users through a role, use `$onlyForRoles` or `$onlyForRoleIDs`.
