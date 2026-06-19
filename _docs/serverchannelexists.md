---
layout: doc
title: $serverChannelExists
translation_key: docs
category: "Entity Info"
function_name: serverChannelExists
syntax: $serverChannelExists[name;guildID]
description: Checks if a channel with a given name exists on a server (guild). Returns true/false.
---
# $serverChannelExists

The function `$serverChannelExists[]` checks if a **channel exists on a given server** (by its name).

## Syntax

```
$serverChannelExists[name;guildID]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | Name of the channel to search for. Case-sensitive. Wildcards (*) supported. |
| `guildID` | ID of the server. If omitted, uses the current server. |

## Return Value

- **Type**: Boolean (string)
- `"true"` if the channel exists.
- `"false"` otherwise.

## Examples

### Simple Check

```bdfd
$if[$serverChannelExists[logs]==true]
  $sendMessage[The #logs channel already exists.]
$else
  $createChannel[logs]
  $sendMessage[#logs channel created.]
$endif
```

### Check with wildcard

```bdfd
$if[$serverChannelExists[ticket-*]==true]
  $sendMessage[Ticket channels already exist.]
$else
  $sendMessage[No ticket channels found.]
$endif
```

### Check on another server

```bdfd
$if[$serverChannelExists[welcome;$guildID[Partner Server]]==true]
  $sendMessage[The welcome channel exists on the partner server.]
$endif
```

## Notes

- Different from `$channelExists[]` which checks by ID, not by name.
- Useful to avoid duplicate channels before creating one.
- The `guildID` parameter is optional (defaults to the current server).
