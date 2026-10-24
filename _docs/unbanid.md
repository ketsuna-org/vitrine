---
layout: doc
title: $unBanID
category: "Moderation"
function_name: unBanID
syntax: $unBanID[(userID)]
description: Unbans a user from the server using their ID. If no ID is given, the last word of the message is used in a prefix command; in a slash command it is an error.
locale: en
translation_key: doc-unbanid
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
| `userID` | Optional - The Discord ID of the user to unban: decimal digits only (`0xDE` or `+222` are refused). If omitted in a **prefix** command, the last word of the message is used (empty if there is none). In a **slash** command there is no fallback: an omitted or empty ID raises `Missing or invalid user ID.` (use `$message[option]`, the ID of a user option). An empty or non-numeric ID raises `Missing or invalid user ID.`. |

## Return Value

- **Type** : String (empty)
- Empty string if the unban succeeds.
- An error is raised on failure (invalid ID, insufficient permissions, or when the Discord call fails, for example because the user is not banned).

## Behavior

- Unlike `$unBan`, which searches the ban list by username, it unbans the given ID.
- The bot must have the `Ban Members` permission.
- There is no reason argument: the unban is made without an audit-log reason.

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

## Slash and prefix example

```bdfd
$onlyPerms[banmembers;You need Ban Members permission.]
$if[$isSlash==true]
  $unBanID[$message[usuário]]
$else
  $unBanID[$message[1]]
$endif
Unbanned.
```

In a slash command the `usuário` option (type `user`) returns the user ID through `$message[usuário]`; see [`$message`](/docs/message/).
