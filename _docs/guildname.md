---
layout: doc
title: $guildName[]
translation_key: docs
category: "Entity Info"
function_name: guildName
syntax: $guildName
description: Alias of $serverName. Returns the name of the Discord server.
---

# $guildName[] — Server Name (Alias)

`$guildName[]` is an alias of `$serverName[]`. It returns the name of the Discord server in which the command is executed.

## Syntax

```
$guildName
```

## Parameters

No parameters.

## Return Value

- **Type**: `string`
- The current name of the server.

## Usage

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
$sendEmbedMessage
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

- `$guildName[]` and `$serverName[]` are interchangeable.
- The term "guild" comes from the Discord API (Discord API Guilds).
- The name returned is always the current name, reflecting any recent change.
