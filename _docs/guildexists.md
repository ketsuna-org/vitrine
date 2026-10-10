---
layout: doc
title: $guildExists[]
translation_key: docs
category: "Entity Info"
function_name: guildExists
syntax: $guildExists[guildId]
description: Checks if a server (guild) with the given ID exists and if the bot has access to it. Returns "true" or "false".
---

# $guildExists[] — Check Server Existence

`$guildExists[]` determines if a Discord server identified by its ID exists and if the bot is currently present on it.

## Syntax

```
$guildExists[guildId]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `guildId` | Yes | The ID of the server to check (exactly one argument). |

## Return Value

- **Type**: `string`
- `"true"` if Discord lets the bot fetch the server, `"false"` otherwise (also `"false"` when the ID is not a positive integer; no error is raised in that case).

> **Note**: The return value is a **string** (`"true"` / `"false"`), not a boolean. For conditions, compare with `==true` or `==false`.

## Examples

### Simple Check

```bdfd
$sendMessage[Presence on server 123456789: $guildExists[123456789]]
```

### Condition Before Action

```bdfd
$if[$guildExists[$message[1]]==true]
$sendMessage[✅ The bot is present on this server.]
$else
$sendMessage[❌ The bot is not on this server, or the ID is invalid.]
$stop
$endif
```

### Multi-Server Check

```bdfd
$var[guild1;123456789012345678]
$var[guild2;987654321098765432]
$if[$guildExists[$var[guild1]]==true]
$sendMessage[Server 1: ✅ Present]
$else
$sendMessage[Server 1: ❌ Absent]
$endif
$if[$guildExists[$var[guild2]]==true]
$sendMessage[Server 2: ✅ Present]
$else
$sendMessage[Server 2: ❌ Absent]
$endif
```

### Availability Log

```bdfd
$if[$guildExists[$var[targetGuild]]==true]
$log[Action executed: server $var[targetGuild] found]
$else
$log[Action blocked: server $var[targetGuild] not found]
$endif
```

## Notes

- The function answers `"false"` when the server is unknown (HTTP 404) or when the bot has no access to it (HTTP 403, missing access); other Discord errors are not turned into `"false"`.
- The ID is trimmed and must contain only digits and be greater than zero; anything else returns `"false"`.
- To get the current server's ID, use `$guildID[]` or `$serverID[]`.
