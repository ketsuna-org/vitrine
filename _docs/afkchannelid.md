---
layout: doc
title: $afkChannelID[]
translation_key: docs
category: "Entity Info"
function_name: afkChannelID
syntax: $afkChannelID
description: Returns the identifier (ID) of the AFK channel configured on the Discord server.
---

# $afkChannelID[] — AFK Channel

`$afkChannelID[]` returns the ID of the AFK (Away From Keyboard) voice channel of the server. Inactive members in a voice channel are automatically moved to this channel after the delay set by `$afkTimeout[]`.

## Syntax

```
$afkChannelID
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| None | | |

## Return value

- **Type**: `string`
- The ID of the AFK channel, or an empty string if not configured.

## Usage

### Displaying the AFK channel

```bdfd
$if[$afkChannelID!=]
$sendMessage[💤 AFK Channel: <#$afkChannelID> (delay: $afkTimeout seconds)]
$else
$sendMessage[ℹ️ No AFK channel is configured on this server.]
$endif
```

### Server configuration embed

```bdfd
$title[⚙️ Configuration of $serverName]
$addField[💤 AFK Channel;$if[$afkChannelID!=]<#$afkChannelID>$elseNot configured$endif;yes]
$addField[⏱️ AFK Delay;$afkTimeout seconds;yes]
$addField[📋 Rules Channel;$if[$rulesChannelID!=]<#$rulesChannelID>$elseNot configured$endif;yes]
$addField[📢 System Channel;$if[$systemChannelID!=]<#$systemChannelID>$elseNot configured$endif;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Configuration log

```bdfd
$log[Server configuration $serverName | AFK: $afkChannelID | Timeout: $afkTimeout | Rules: $rulesChannelID | System: $systemChannelID]
```

## Notes

- The AFK channel must be a voice channel.
- If no AFK channel is configured, the function returns an empty string.
- The delay before moving is given by `$afkTimeout[]` (in seconds).
- Members in the AFK channel are automatically muted by Discord.
