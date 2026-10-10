---
layout: doc
title: $serverRegion[]
translation_key: docs
category: "Entity Info"
function_name: serverRegion
syntax: $serverRegion[(unused)]
description: Returns the server region supplied by the host in the guild.region context variable, or an empty string.
---

# $serverRegion[] — Server Region

`$serverRegion[]` returns the value of the `guild.region` context variable supplied by the host. The engine does not query Discord for a region.

## Syntax

```
$serverRegion[(unused)]
```

## Parameters

One optional argument is accepted but ignored: the region of another server cannot be read.

## Return Value

- **Type**: `string`
- The text of `guild.region` exactly as the host supplied it.
- An empty string if the host supplied none.

## Examples

### Simple display

```bdfd
$sendMessage[🌍 Region: $serverRegion]
```

### Informative embed

```bdfd
$title[Information on $serverName]
$addField[Region;$serverRegion;yes]
$addField[Verification Level;$serverVerificationLevel;yes]
$addField[Boost Level;$boostLevel;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
```

### Logs

```bdfd
$log[Server $serverName — Region: $serverRegion]
```

## Notes

- The bot runner does not set `guild.region` by itself in the code that was checked, so the result is normally an empty string; do not rely on it.
- The returned text is not interpreted by the engine.
