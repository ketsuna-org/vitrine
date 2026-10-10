---
layout: doc
title: $serverInfo[]
translation_key: docs
category: "Entity Info"
function_name: serverInfo
syntax: $serverInfo[(guildID);(field)]
description: Returns the runtime value `guild.info` of the current context, or an empty string when none is provided. The arguments are not read by the engine.
---

# $serverInfo[] — Server Information

`$serverInfo[]` returns the text stored in the runtime variable `guild.info` of the current execution context. If the context does not provide this variable, the function returns an empty string.

## Syntax

```
$serverInfo
$serverInfo[(guildID);(field)]
```

The function accepts from 0 to 2 arguments.

## Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `guildID` | No | — | Accepted but not read by the engine. |
| `field` | No | — | Accepted but not read by the engine: no property selection (`name`, `id`, `ownerID`...) is performed. |

## Return Value

- **Type**: `string`
- The value of `guild.info` provided by the execution context, or `""` when the context does not provide it. The engine does not build a server object by itself.

## Examples

```bdfd
$title[Server information]
$description[$serverInfo]
$color[#5865F2]
```

The description is empty when the execution context does not provide `guild.info`.

## Notes

- To read specific server properties, use the dedicated functions: `$serverName`, `$serverIcon`, `$serverBoostCount`, `$serverVerificationLevel`, `$membersCount`, `$emojiCount`, etc.
