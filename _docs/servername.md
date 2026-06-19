---
layout: doc
title: $serverName[]
translation_key: docs
category: "Entity Info"
function_name: serverName
syntax: $serverName
description: Returns the name of the server (guild) in which the command is executed.
---

# $serverName[] — Name of the Server

`$serverName[]` returns the name of the Discord server in which the command is executed.

## Syntax

```
$serverName
```

## Parameters

None.

## Return Value

- **Type**: `string`
- The current name of the server.

## Usage

### Welcome message

```bdfd
$sendMessage[Welcome to **$serverName**! We are glad to have you with us.]
```

### Embed with the server name

```bdfd
$title[$serverName — Rules]
$description[Please read the rules of $serverName carefully.]
$color[#E74C3C]
$sendEmbedMessage
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

- `$serverName[]` is an alias of `$guildName[]`.
- The returned value is dynamic: it reflects the current name of the server, even if it was recently changed.
- Useful for customizing messages based on the server.
