---
layout: doc
title: $fetchUserAuditLog
translation_key: docs
category: "Audit log"
function_name: fetchUserAuditLog
syntax: $fetchUserAuditLog[guildID;userID;actionType;(property);(index);(side)]
description: Reads one property of an audit log entry about a user, as executor or as target. Bot Creator function, not in BDFD.
---

# $fetchUserAuditLog

The `$fetchUserAuditLog` function **reads an audit log entry associated with one user**, as the person who did the action, as the person it was done to, or either. It is made for moderation histories ("what happened to this member?"). It changes nothing.

This function does not exist in BDFD: it is specific to Bot Creator.

## Syntax

```
$fetchUserAuditLog[guildID;userID;actionType;(property);(index);(side)]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | The server whose log is read. Empty: the current server. |
| `userID` | Required. The user to look for. An invalid ID raises `Invalid user ID.` |
| `actionType` | A type name (`memberBanAdd`, `kick`, `timeout`...), the Discord `action_type` number, or empty/`all`. See `$fetchAuditLog`. |
| `property` | Optional. What to read: the same properties as `$fetchAuditLog` (`executorID`, `targetID`, `actionType`, `reason`, `timestamp`, `changes`...). Empty or absent: the whole entry as JSON. |
| `index` | Optional. Which matching entry, `1` (default) being the most recent, up to `1000`. No such entry returns an empty string. |
| `side` | Optional. `executor` (the user did it), `target` (it was done to the user) or `any` (default). Anything else raises an error. |

## Return value

| Type | Description |
|---|---|
| `string` | The value of the property (the entry as JSON without a property), or an empty string. |

## Examples

### Why was this member banned?

```bdfd
$fetchUserAuditLog[;$message[1];ban;reason;1;target]
```

### Latest action made by a moderator

```bdfd
$fetchUserAuditLog[;$authorID;;actionType;1;executor]
```

### Latest actions about a member

```bdfd
$sendMessage[1. $fetchUserAuditLog[;$message[1];;actionType;1]: $fetchUserAuditLog[;$message[1];;reason;1]
2. $fetchUserAuditLog[;$message[1];;actionType;2]: $fetchUserAuditLog[;$message[1];;reason;2]
3. $fetchUserAuditLog[;$message[1];;actionType;3]: $fetchUserAuditLog[;$message[1];;reason;3]]
```

## Notes

- The bot needs the **View Audit Log** permission.
- Discord keeps the audit log for 45 days. Only the 1000 latest entries are read by one call.
- With `executor`, Discord does the filtering; with `target` or `any` the log is read page by page (100 entries per request), so prefer a precise `actionType`.
- In a JavaScript bot (discord.js): `guild.fetchAuditLogs({ type, user })`, then filter on `entry.targetId`.
- See also `$fetchAuditLog` and `$fetchAuditLogCount`.
