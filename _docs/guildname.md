---
layout: doc
title: $guildName[]
translation_key: docs
category: "Entity Info"
function_name: guildName
syntax: $guildName[(guildID)]
description: Alias of $serverName. Returns the name of the Discord server.
---

# $guildName[] — Server Name (Alias)

`$guildName[]` is an alias of `$serverName[]`. It returns the name of the Discord server in which the command is executed.

## Syntax

```
$guildName[(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | *(Optional)* The ID of a server. When omitted, the current server is used. When an argument is given it must be a positive integer, otherwise `Invalid guild ID.` is raised. |

## Return Value

- **Type**: `string`
- Without argument: the `guild.name` context variable supplied by the host if present, otherwise the name fetched from Discord for the current server.
- With an ID: the name of that server. `Guild not found.` is raised if it cannot be fetched.

## Examples

### Welcome Message

```bdfd
$sendMessage[Welcome to **$guildName**, $username! 🎉]
```

### Custom Embed

```bdfd
$title[$guildName — Information]
$description[Everything you need to know about $guildName]
$addField[ID;$guildID;yes]
$addField[Members;$membersCount;yes]
$thumbnail[$guildIcon]
$color[#5865F2]
```

### Logs

```bdfd
$log[New command executed on $guildName ($guildID)]
```

### Condition

```bdfd
$if[$guildName==My Server]
$sendMessage[You are on the main server!]
$endif
```

## Notes

- `$guildName` and `$serverName` use the same handler and are interchangeable.
