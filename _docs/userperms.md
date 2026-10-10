---
layout: doc
title: $userPerms
translation_key: docs
category: "Entity Info"
function_name: userPerms
syntax: $userPerms[userID;amount;separator]
description: Returns the permissions granted to a user by their roles on the current server, as a list of names.
---

# $userPerms

The `$userPerms` function returns the **list of permissions** of a user on the server, obtained by combining the permissions of all their roles (including `@everyone`). Channel overrides are not taken into account.

## Syntax

```
$userPerms[userID;amount;separator]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Required - The ID of the member. An invalid ID raises an error. |
| `amount` | Required - Maximum number of permissions to return, or `-1` for all. Any other negative or non-numeric value raises an error. |
| `separator` | Required - The text placed between two permissions (can be empty). |

## Return Value

- **Type**: List of permission names, joined with `separator`
- Names are in upper case with underscores, in Discord bit order. Example: `ADD_REACTIONS, VIEW_CHANNEL, SEND_MESSAGES, READ_MESSAGE_HISTORY`
- Permissions without a known label are omitted.

## Behavior

- `$userPerms` requires its 3 arguments: used without argument it is invalid.
- Returns the permissions resulting from the roles of the member in the current server.
- `ADMINISTRATOR` is not expanded into the other permissions.

## Examples

### Display permissions

```bdfd
$title[Permissions of $userName]
$description[
**Permissions:**
$userPerms[$authorID;-1;, ]
]
$color[#5865F2]
$sendMessage[Permissions]
```

### Restrict a command to moderators

```bdfd
$if[$checkContains[$userPerms[$authorID;-1;,];BAN_MEMBERS]==true]
  $ban[Moderation]
  $sendMessage[<@$mentioned> was banned.]
$else
  $sendMessage[You do not have permission to ban members.]
$endif
```

### Check multiple permissions

```bdfd
$if[$checkContains[$userPerms[$authorID;-1;,];MANAGE_MESSAGES]==true]
  $deleteMessage[$messageID[$mentioned]]
  $sendMessage[Message deleted.]
$else
  $sendMessage[ManageMessages permission required.]
$endif
```

## Notes

- Permission names are in English, in `UPPER_SNAKE_CASE`.
- For a simple admin check, use `$isAdmin`.
