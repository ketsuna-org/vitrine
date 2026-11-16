---
layout: doc
title: $auditLogReason
translation_key: docs
category: "Control Flow"
function_name: auditLogReason
syntax: $auditLogReason[(reason)]
description: Sets the reason shown in the server's audit log for every Discord action the script runs after it (roles, members, channels, messages, emojis, webhooks...).
---

`$auditLogReason` sets a default **audit log reason** for the rest of the script. Every action that can carry a reason (Discord's `X-Audit-Log-Reason` header) uses it unless the call has its own `reason` argument.

## Syntax

```text
$auditLogReason[reason]
```

`$auditLogReason[]` (or `$auditLogReason` alone) clears the default reason.

## Parameters

| Parameter | Description |
|---|---|
| `reason` | Optional. The text shown next to the action in the audit log. Up to 512 characters, otherwise the action fails with `Reason must not exceed 512 characters.` |

## What it does

- It applies to the actions **after** it, in the **current script**: the reason is forgotten when a new script starts.
- A function's own optional last argument wins: `$giveRole[$authorID;$roleID[Member];Joined the club]` records `Joined the club`, whatever `$auditLogReason` says. An empty `reason` argument falls back to the default.
- It is the only way to give a reason to the functions that take any number of arguments (`$giveRoles`, `$takeRoles`, `$setUserRoles`, `$roleGrant`, `$modifyRolePerms`, `$editChannelPerms`, `$modifyChannelPerms`, `$deleteChannels`, `$deleteChannelsByName`).
- Actions that Discord does not log with a reason (sending or editing messages, reactions, thread members, polls, crossposting, webhook execution, application commands) ignore it.
- A reason is plain text: it is not shown to the member concerned.

## Example

```bdfd
$auditLogReason[Raid cleanup by $username[$authorID]]
$giveRoles[$mentioned[1];$roleID[Quarantine];$roleID[Muted]]
$deleteChannelsByName[raid-room]
$sendMessage[Done.]
```
