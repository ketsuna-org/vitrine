---
layout: doc
title: $fetchAuditLogCount
translation_key: docs
category: "Audit log"
function_name: fetchAuditLogCount
syntax: $fetchAuditLogCount[guildID;actionType;(executorID);(targetID)]
description: Counts the entries of the server's audit log that match a type, an executor and a target. Bot Creator function, not in BDFD.
---

# $fetchAuditLogCount

The `$fetchAuditLogCount` function **returns the number of audit log entries** that match the filters. It reads the 1000 latest entries, so the result never exceeds `1000`. It changes nothing.

This function does not exist in BDFD: it is specific to Bot Creator.

## Syntax

```
$fetchAuditLogCount[guildID;actionType;(executorID);(targetID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | The server whose log is read. Empty: the current server. |
| `actionType` | A type name (`memberBanAdd`, `kick`, `roleDelete`...), the Discord `action_type` number, or empty/`all` for every type. See `$fetchAuditLog`. |
| `executorID` | Optional. Only entries made by this user. |
| `targetID` | Optional. Only entries about this target. |

## Return value

| Type | Description |
|---|---|
| `string` | The number of matching entries (`0` when none). |

## Examples

### Bans made by a moderator

```bdfd
$sendMessage[<@$message[1]> banned $fetchAuditLogCount[;ban;$message[1]] members recently.]
```

### Actions about a member

```bdfd
$sendMessage[$fetchAuditLogCount[;;;$authorID] entries are about you.]
```

## Notes

- The bot needs the **View Audit Log** permission.
- Discord keeps the audit log for 45 days.
- To read the entries themselves, use `$fetchAuditLog` or `$fetchUserAuditLog`.
- In a JavaScript bot (discord.js): `(await guild.fetchAuditLogs({ type, user, limit: 100 })).entries.size`.
