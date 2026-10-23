---
layout: doc
title: $membersCount[]
translation_key: docs
category: "Entity Info"
function_name: membersCount
syntax: $membersCount[(Presence)]
description: Returns the total number of members on the Discord server, or only those with a given presence. Without argument, identical to $memberCount.
---

# $membersCount[] — Number of Members

`$membersCount` returns the total number of members on the Discord server. Without argument it is strictly identical to `$memberCount`. With a presence, it counts only the members in that state.

## Syntax

```
$membersCount[(Presence)]
```

## Parameters

| Parameter | Description |
|---|---|
| `Presence` | Optional. `online`, `offline`, `idle`, `invisible` or `dnd` (case-insensitive). If omitted or empty, all members are counted. Any other value raises `Presence must be online, offline, idle, invisible or dnd.` |

## Return Value

- **Type** : `integer`
- The total number of members, or the number of members with the given presence.

## Examples

### Simple display

```bdfd
$sendMessage[👥 **$membersCount** members!]
```

### Statistics embed

```bdfd
$title[📊 $serverName]
$addField[👥 Members;$membersCount;yes]
$addField[🟢 Online;$onlineMembers;yes]
$addField[🤖 Bots;$botCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
```

### Members by presence

```bdfd
$sendMessage[Online: $membersCount[online] / Idle: $membersCount[idle] / DND: $membersCount[dnd] / Offline: $membersCount[offline]]
```

### Comparison

```bdfd
$if[$membersCount>$var[previousCount]]
$sendMessage[📈 The server has gained members!]
$endif
```

## Notes

- `$membersCount` and `$memberCount` use the same implementation: the number of members obtained by listing the server's members from Discord (1000 per request), bots included.
- Presence counts come from the gateway snapshot and need the **Presence Intent** (Guild Presence) enabled for the bot in the Discord developer portal. Otherwise the error `Presence counts need the Guild Presence intent...` is raised; the same applies to servers above 75000 members (Discord does not send their presences) and while the snapshot of the server has not been received yet.
- `offline` is the member count minus the members who are not offline. `invisible` always returns `0`: Discord reports invisible members as offline.
- To get the count of human users only, use `$sub[$membersCount;$botCount]`.

