---
layout: doc
title: $serverOwner[]
translation_key: docs
category: "Entity Info"
function_name: serverOwner
syntax: $serverOwner[(Guild ID)]
description: Returns the identifier (ID) of the owner of the current Discord server, or of the server whose ID is given.
---

# $serverOwner[] — Owner of the Server

`$serverOwner[]` returns the Discord identifier (ID) of the owner of the server. This ID can be used to mention the owner, check permissions, or restrict commands.

## Syntax

```
$serverOwner[(Guild ID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `Guild ID` | Optional. The server to read. If omitted or empty, the current server is used. A non-numeric or non-positive value raises `Invalid guild ID.` |

## Return Value

- **Type**: `string`
- The ID (Snowflake) of the owner of the server, fetched from Discord.
- The error `Guild not found.` is raised if the server cannot be fetched.

## Examples

### Mention the owner

```bdfd
$sendMessage[👑 Owner of the server: <@$serverOwner>]
```

### Owner of another server

```bdfd
$sendMessage[Owner: <@$serverOwner[123456789012345678]>]
```

### Restrict a command to the owner

```bdfd
$if[$authorID!=$serverOwner]
$sendMessage[⛔ Only the server owner can use this command.]
$stop
$endif
$sendMessage[Owner command executed.]
```

### Informative embed

```bdfd
$title[Information on $serverName]
$description[Server managed by <@$serverOwner>]
$addField[Server ID;$serverID;yes]
$addField[Owner;$serverOwner;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
```

### Notification to the owner

```bdfd
$sendMessage[<@$serverOwner>, a user is requesting your attention.]
```

## Notes

- `$serverOwner` takes at most one argument, the server ID.
- Use `$username[$serverOwner]` to get the name of the owner without mentioning them.
