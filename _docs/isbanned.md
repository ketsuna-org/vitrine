---
layout: doc
title: $isBanned
translation_key: docs
category: "Math & Text"
function_name: isBanned
syntax: $isBanned[userID]
description: Checks if a user is banned from the current server.
---

# $isBanned

The function `$isBanned[userID]` **checks if a user is currently banned** from the server where the command was executed. The bot must have the `BanMembers` permission (or Administrator).

## Syntax

```
$isBanned[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Required, exactly one argument. A positive integer ID; anything else raises the error "Invalid user ID.". |

## Return Value

- **Type**: Boolean
- `"true"` if the user is banned from the server.
- `"false"` if Discord answers that there is no ban for this ID (including a user who does not exist).

## Behavior

- The bot needs the `BanMembers` permission (or Administrator) to consult the ban list. Without it the command stops with an error message ("I do not have permission to read bans...") instead of returning `false`.
- The check is a lookup of a ban by user ID, so it does not require the user to be a member of the server.
- Checks only the current server, and needs a server context (outside a server the call fails with "Missing guildId").

## Examples

### Check before commanding

```bdfd
$if[$isBanned[$mentioned[1]]==true]
  $sendMessage[⚠️ <@$mentioned[1]> is already banned from this server.]
$else
  $banID[Reason provided by $userName;$mentioned[1]]
  $sendMessage[🔨 <@$mentioned[1]> was banned.]
$endif
```

### Unban a user

```bdfd
$if[$isBanned[$message[1]]==true]
  $unbanID[$message[1]]
  $sendMessage[✅ The user $message[1] was unbanned.]
$else
  $sendMessage[❌ This ID is not banned.]
$endif
```

### Verification log

```bdfd
$var[userID;$message[1]]
$if[$isBanned[$var[userID]]==true]
  $var[reason;$getBanReason[$var[userID]]]
  $sendMessage[📋 **Ban found:**
  > ID: $var[userID]
  > Reason: $var[reason]]
$else
  $sendMessage[✅ No ban found for $var[userID].]
$endif
```

## Notes

- Without the `BanMembers` permission the function fails instead of returning a result.
- To get the ban reason, use `$getBanReason[]`.
- To ban or unban, use `$ban[]`, `$banID[]`, `$unban` or `$unbanID[]`.
- Works only within a server context (not in DMs).
