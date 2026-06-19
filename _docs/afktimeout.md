---
layout: doc
title: $afkTimeout[]
translation_key: docs
category: "Entity Info"
function_name: afkTimeout
syntax: $afkTimeout
description: Returns the inactivity delay (in seconds) before a member is moved to the AFK channel.
---

# $afkTimeout[] — AFK Delay

`$afkTimeout[]` returns the inactivity delay configured on the server, after which an inactive member in a voice channel is automatically moved to the AFK channel.

## Syntax

```
$afkTimeout
```

## Parameters

No parameters.

## Return value

- **Type**: `integer`
- The delay in seconds. Possible values are: 60, 300, 900, 1800, 3600.

| Seconds | Equivalent |
|----------|------------|
| 60 | 1 minute |
| 300 | 5 minutes |
| 900 | 15 minutes |
| 1800 | 30 minutes |
| 3600 | 1 hour |

## Usage

### Formatted display

```bdfd
$var[timeout;$afkTimeout]
$if[$var[timeout]>=3600]
$var[timeoutText;$round[$divide[$var[timeout];3600]] hour(s)]
$elseIf[$var[timeout]>=60]
$var[timeoutText;$round[$divide[$var[timeout];60]] minute(s)]
$else
$var[timeoutText;$var[timeout] second(s)]
$endif
$sendMessage[💤 AFK Delay: **$var[timeoutText]**]
```

### Server configuration

```bdfd
$title[⚙️ Settings of $serverName]
$addField[💤 AFK Channel;$if[$afkChannelID!=]<#$afkChannelID>$elseNone$endif;yes]
$addField[⏱️ AFK Delay;$round[$divide[$afkTimeout;60]] minutes;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Alert if delay is very short

```bdfd
$if[$afkTimeout<=60]
$sendMessage[⚠️ The AFK delay is very short (1 minute). Members will be moved quickly.]
$endif
```

## Notes

- The AFK channel is configured separately; use `$afkChannelID[]` to retrieve it.
- If no AFK channel is configured, the timeout has no effect.
- Discord limits the possible values to the list above (no custom values).
- Members in the AFK channel are automatically muted.
