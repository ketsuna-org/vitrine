---
layout: doc
title: $unBan
translation_key: docs
category: "Moderation"
function_name: unBan
syntax: $unBan[userID]
description: Unbans a user from the server using their ID. The user will be able to rejoin the server with a new invite.
---

# $unBan

The function `$unBan[]` allows you to **unban a user** from the server using their Discord ID. Once unbanned, the user will be able to rejoin the server with a new invite.

## Syntax

```
$unBan[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The Discord ID of the user to unban. |

## Return Value

- **Type**: String (empty on success)
- An empty string if the unban is successful.
- An error message if the user is not banned or if the bot lacks permissions.

## Behavior

- The bot must have the `BAN_MEMBERS` permission.
- The user must be in the server's ban list.
- The ID can be retrieved via `$mentioned[]`, `$findUser[]`, or any other method.
- The user does not receive an unban notification.

## Examples

### Simple Unban

```bdfd
$if[$checkContains[$userPerms;BanMembers]==true]
  $unBan[$mentioned[1]]
  $sendMessage[✅ **$userName[$mentioned[1]]** was unbanned.]
$else
  $sendMessage[❌ Permission denied.]
$endif
```

### Unban with Confirmation

```bdfd
$let[target;$mentioned[1]]

$if[$isBanned[$target]==true]
  $unBan[$target]
  $title[🔓 Unban]
  $description[
  **User:** $userName[$target] ($target)
  **Previous Reason:** $getBanReason[$target]
  **Unbanned by:** $userName[$authorID]
  ]
  $color[#57F287]
  $sendMessage[]
$else
  $sendMessage[❌ This user is not banned.]
$endif
```

### Command with Manual ID

```bdfd
$if[$message!=]
  $let[exists;$userExists[$message]]
  $if[$exists==true]
    $unBan[$message]
    $sendMessage[✅ User **$message** unbanned.]
  $elseif[$isBanned[$message]==true]
    $unBan[$message]
    $sendMessage[✅ User **$message** unbanned.]
  $else
    $sendMessage[❌ Invalid ID or user not banned.]
  $endif
$else
  $sendMessage[Please provide a user ID.]
$endif
```

## Notes

- The unbanned user does not automatically rejoin the server; they must use an invite.
- Works only if the user is in the ban list.
- The ID is the only reliable method, because a banned user is no longer in the server.

