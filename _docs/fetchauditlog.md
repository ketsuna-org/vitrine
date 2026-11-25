---
layout: doc
title: $fetchAuditLog
translation_key: docs
category: "Audit log"
function_name: fetchAuditLog
syntax: $fetchAuditLog[guildID;actionType;property;(index);(executorID);(targetID)]
description: Reads one property of an entry of the server's audit log (executor, target, type, date, reason, changes). Bot Creator function, not in BDFD.
---

# $fetchAuditLog

The `$fetchAuditLog` function **reads an entry of the server's audit log** and returns one of its properties: who did it, to whom, what, when, why, and what changed. Entries are numbered from the most recent (`1`). It changes nothing.

This function does not exist in BDFD: it is specific to Bot Creator. To record a reason when your bot acts, see `$auditLogReason`.

## Syntax

```
$fetchAuditLog[guildID;actionType;property;(index);(executorID);(targetID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | The server whose log is read. Empty: the current server (an empty value outside a server raises `A server ID is required outside a server.`). The bot must be in that server. |
| `actionType` | The type of entry to keep: a name such as `memberBanAdd`, `MEMBER_KICK` or `roleDelete` (case, `_`, `-` and spaces are ignored), a short name (`ban`, `unban`, `kick`, `prune`, `timeout`) or the Discord `action_type` number (for example `22`). Empty or `all`: every type. An unknown value raises `Unknown audit log action type`. |
| `property` | Required (it may be empty). What to read, see the table below. Empty or `json`: the whole entry as JSON. An unknown property raises an error listing the valid ones. |
| `index` | Optional. Which matching entry, `1` (default) being the most recent, up to `1000`. No such entry returns an empty string. |
| `executorID` | Optional. Only entries made by this user. |
| `targetID` | Optional. Only entries about this target (a user, role, channel...). |

## Properties

| Property | Value |
|---|---|
| `id` | The ID of the entry. |
| `executorID` | The ID of the user who did the action (empty when Discord gives none). |
| `targetID` | The ID of the affected user, role, channel... (empty when none). |
| `actionType` | The name of the type, such as `memberBanAdd`. |
| `actionTypeID` | The Discord `action_type` number. |
| `reason` | The reason given for the action, empty when none. |
| `timestamp` | When the action happened, in Unix milliseconds. |
| `createdAt` | The same moment as an ISO 8601 UTC date. |
| `changes` | The changes as a JSON array of `{key, old, new}`, to use with the `$json` functions. |
| `changedKeys` | The names of the changed fields, separated by commas. |
| `changeCount` | The number of changed fields. |
| `options` | Extra information (channel, message, count, role name...) as a JSON object. |
| `old.<key>` / `new.<key>` | The old or new value of one changed field, such as `new.nick` or `old.name`. Empty when that field did not change. |
| `json` | The whole entry as a JSON object. |

A property that the entry does not have (no reason, no target) is an **empty string**, the same as an entry that does not exist.

## Return value

| Type | Description |
|---|---|
| `string` | The value of the property, or an empty string. |

## Examples

### Who banned a member, and why?

```bdfd
$sendMessage[Banned by <@$fetchAuditLog[;ban;executorID;1;;$message[1]]>: $fetchAuditLog[;ban;reason;1;;$message[1]]]
```

### Last entry of any type

```bdfd
$sendMessage[Last action: $fetchAuditLog[;;actionType] by <@$fetchAuditLog[;;executorID]>: $fetchAuditLog[;;reason]]
```

### Third latest kick

```bdfd
$sendMessage[$fetchAuditLog[;kick;reason;3]]
```

## Notes

- The bot needs the **View Audit Log** permission, otherwise the call fails (use `$try` to catch it).
- Discord keeps the audit log for 45 days. Only the 1000 latest entries are read by one call.
- Filtering by action type and executor is done by Discord; filtering by target reads the log page by page (100 entries per request), so prefer a precise `actionType`.
- Entries made by the bot itself with `$auditLogReason` or a `reason` argument show that reason here.
- In a JavaScript bot (discord.js): `guild.fetchAuditLogs({ type, user, limit })`, then `entries.first()`.
- See also `$fetchAuditLogCount` and `$fetchUserAuditLog`.
