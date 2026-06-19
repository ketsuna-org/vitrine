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

The function `$isBanned[userID]` **checks if a user is currently banned** from the server where the command was executed. The bot must have the `BanMembers` permission.

## Syntax

```
$isBanned[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user to check. |

## Return Value

- **Type**: Boolean
- `true` if the user is banned from the server.
- `false` if the user is not banned or does not exist.

## Behavior

- The bot needs the `BanMembers` permission to consult the ban list.
- Works even if the user has left the server.
- Checks only the current server.

## Examples

### Check before commanding

```bdfd
$if[$isBanned[$mentioned[1]]==true]
  $sendMessage[⚠️ <@$mentioned[1]> is already banned from this server.]
$else
  $ban[$mentioned[1];Reason provided by $userName]
  $sendMessage[🔨 <@$mentioned[1]> was banned.]
$endif
```

### Unban a user

```bdfd
$if[$isBanned[$message[1]]==true]
  $unban[$message[1]]
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

- The bot must have the `BanMembers` permission for this function to return a reliable result.
- To get the ban reason, use `$getBanReason[]`.
- To ban or unban, use `$ban[]` or `$unban[]`.
- Works only within a server context (not in DMs).
