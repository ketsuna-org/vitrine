---
layout: doc
title: $unBanID
translation_key: docs
category: "Moderation"
function_name: unBanID
syntax: $unBanID[(userID)]
description: Unbans a user from the server using their ID. If no ID is given, the last word of the message is used.
---

# $unBanID

The function `$unBanID[]` allows **unbanning a user by their ID**. Unlike `$unBan`, which searches by username, it works from the raw ID.

## Syntax

```
$unBanID[(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional - The Discord ID of the user to unban. If omitted, the last word of the message is used. An invalid ID raises an error. |

## Return Value

- **Type** : String (empty)
- Empty string if the unban succeeds.
- An error is raised on failure (invalid ID, user not banned, insufficient permissions, etc.).

## Behavior

- Unlike `$unBan`, which searches the ban list by username, it unbans the given ID.
- The bot must have the `BAN_MEMBERS` permission.

## Examples

### Unban from an ID

```bdfd
$unBanID[$message[1]]
$sendMessage[✅ **$message[1]** was unbanned.]
```

### Scheduled unban

```bdfd
$var[target;$noMentionMessage]
$if[$isBanned[$var[target]]==true]
  $unBanID[$var[target]]
  $channelSendMessage[$channelID[mod-logs];User **$var[target]** was unbanned (end of ban duration).]
$endif
```

## Notes

- Use `$unBan` to unban by username.
- Useful for internal scripts where only the ID is known.
