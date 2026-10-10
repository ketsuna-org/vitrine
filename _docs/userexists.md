---
layout: doc
title: $userExists
translation_key: docs
category: "Entity Info"
function_name: userExists
syntax: $userExists[userID]
description: Checks if a user ID can be resolved by the bot and returns "true" or "false". Only numeric IDs are accepted.
---

# $userExists

The `$userExists` function checks if the bot can look up a Discord user from a numeric **ID**.

## Syntax

```
$userExists[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The numerical ID (digits only, greater than 0). A mention such as `<@ID>`, text, or `0` raises the error `Invalid user ID.` (it does not return `false`). |

## Return Value

- **Type**: String `"true"` or `"false"`
- `"true"` if the user lookup returns a user.
- `"false"` if the lookup finds no user.
- An invalid ID (not digits only, or zero) is an error, not `"false"`.

## Behavior

- The user is fetched from Discord by ID; a "user not found" answer from Discord gives `false`. The server membership of the user is not checked.

## Examples

### Check a mention

```bdfd
$if[$userExists[$mentioned[1]]==true]
  $title[Information on <@$mentioned[1]>]
  $description[
  **ID:** $mentioned[1]
  **Name:** $userName[$mentioned[1]]
  ]
  $color[#5865F2]
  $sendMessage[User found.]
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

- `$userExists` does not check if the user is a **member of the server**.
- Pass a plain ID: `$mentioned[1]` returns the ID of the first mentioned user (message commands only).
