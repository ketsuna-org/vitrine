---
layout: doc
title: $userExists
translation_key: docs
category: "Entity Info"
function_name: userExists
syntax: $userExists[userID/mention]
description: Checks if the specified user (by ID or mention) exists on Discord and returns "true" or "false".
---

# $userExists

The `$userExists` function checks if a Discord user exists, based on an **ID** or a **mention**.

## Syntax

```
$userExists[userID/mention]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID/mention` | The numerical ID (snowflake) or the mention (`<@ID>`) of the user to check. |

## Return Value

- **Type**: String `"true"` or `"false"`
- `"true"` if the user exists and is known to the bot.
- `"false"` if the ID is invalid or the user is not found.

## Behavior

- The verification is based on the users accessible to the bot (shared server cache).
- A user can exist on Discord without being on the bot's server — in this case, the result depends on the context.

## Examples

### Check a mention

```bdfd
$if[$userExists[$mentioned]==true]
  $title[Information on <@$mentioned>]
  $description[
  **ID:** $mentioned
  **Name:** $userName[$mentioned]
  ]
  $color[#5865F2]
  $sendMessage[]
$else
  $sendMessage[I cannot find this user.]
$endif
```

### Check a static ID

```bdfd
$if[$userExists[123456789012345678]==true]
  $sendMessage[The owner still exists!]
$endif
```

## Notes

- Use `$userExists` to validate user inputs before executing actions that might fail.
- `$userExists` does not check if the user is a **member of the server**, only if they exist on Discord and are known to the bot.
- This function is useful for preventing errors in commands that use user-provided IDs.
