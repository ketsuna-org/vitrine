---
layout: doc
title: $serverName[]
translation_key: docs
category: "Entity Info"
function_name: serverName
syntax: $serverName[(guildID)]
description: Returns the name of the server (guild) in which the command is executed.
---

# $serverName[] — Name of the Server

`$serverName[]` returns the name of the Discord server in which the command is executed, or of the server whose ID is given.

## Syntax

```
$serverName[(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | *(Optional)* The ID of a server. If omitted, the current server is used. When an argument is given it must be a positive integer, otherwise `Invalid guild ID.` is raised. |

## Return Value

- **Type**: `string`
- Without argument: the `guild.name` context variable supplied by the host if present, otherwise the name fetched from Discord for the current server.
- With an ID: the name of that server; `Guild not found.` is raised if it cannot be fetched.

## Examples

### Welcome message

```bdfd
$sendMessage[Welcome to **$serverName**! We are glad to have you with us.]
```

### Embed with the server name

```bdfd
$title[$serverName — Rules]
$description[Please read the rules of $serverName carefully.]
$color[#E74C3C]
```

### Logs

```bdfd
$log[The command was executed on the server: $serverName]
```

### Condition on the name

```bdfd
$if[$serverName==My Server]
$sendMessage[Welcome to the main server!]
$else
$sendMessage[Welcome to $serverName!]
$endif
```

## Notes

- `$serverName` and `$guildName` use the same handler and are interchangeable.
