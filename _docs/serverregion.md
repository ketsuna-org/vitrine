---
layout: doc
title: $serverRegion[]
translation_key: docs
category: "Entity Info"
function_name: serverRegion
syntax: $serverRegion
description: Returns the voice region of the Discord server (deprecated — Discord now uses automatic voice regions per channel).
---

# $serverRegion[] — Server Region

`$serverRegion[]` returns the configured voice region for the Discord server.

> **Note**: Since Discord's 2023 update, the region is no longer configured at the server level but at the individual voice channel level instead. This function may therefore return "automatic" on most modern servers.

## Syntax

```
$serverRegion
```

## Parameters

None.

## Return Value

- **Type**: `string`
- The region of the server (e.g., `"europe"`, `"us-west"`, `"automatic"`, etc.).

## Usage

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
$sendEmbedMessage
```

### Logs

```bdfd
$log[Server $serverName — Region: $serverRegion]
```

## Notes

- The region determines the geographical location of voice servers, which affects latency.
- **Deprecated**: Discord migrated to a system of automatic regions per voice channel. The returned value may no longer be relevant.
- Historically possible values: `brazil`, `europe`, `hongkong`, `india`, `japan`, `russia`, `singapore`, `southafrica`, `sydney`, `us-central`, `us-east`, `us-south`, `us-west`.
- For recent servers, the value will generally be `"automatic"`.
