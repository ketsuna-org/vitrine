---
layout: doc
title: $afkTimeout[]
translation_key: docs
category: "Entity Info"
function_name: afkTimeout
syntax: $afkTimeout[(serverID)]
description: Returns the AFK timeout of the server in seconds, for the current server or for the server whose ID is given.
---

# $afkTimeout[] — AFK Delay

`$afkTimeout[]` returns the AFK timeout configured on the server (the inactivity delay of Discord's AFK setting), in seconds.

## Syntax

```
$afkTimeout[(serverID)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:--------:|
| `serverID` | ID of the server to read. If omitted or empty, the current server is used. A value that is not a positive number raises `Invalid guild ID.`; an unreachable server raises `Guild not found.` | No |

## Return value

- **Type**: `integer`
- The delay in seconds, as given by Discord for the server (for example `300` for 5 minutes).
- If the value is unavailable, the error `Guild AFK timeout is unavailable.` is raised.

## Examples

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
$addField[⏱️ AFK Delay;$round[$divide[$afkTimeout;60]] minutes;yes]
$color[#5865F2]
```

### Alert if delay is very short

```bdfd
$if[$afkTimeout<=60]
$sendMessage[⚠️ The AFK delay is very short (1 minute). Members will be moved quickly.]
$endif
```

## Notes

- The AFK channel is configured separately; use `$afkChannelID[]` to retrieve it.
- The value is returned even if the server has no AFK channel; `$afkChannelID[]` raises an error in that case.
