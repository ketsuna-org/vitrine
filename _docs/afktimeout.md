---
layout: doc
title: $afkTimeout[]
translation_key: docs
category: "Entity Info"
function_name: afkTimeout
syntax: $afkTimeout
description: Returns the delay d'inactivité (en seconds) before qu'un member soit déplacé vers the channel AFK.
---

# $afkTimeout[] — Delay AFK

`$afkTimeout[]` returns the delay d'inactivité configured on the server, after lequel un member inactif in a channel vocal est automatically déplacé vers the channel AFK.

## Syntax

```
$afkTimeout
```

## Parameters

No parameters.

## Return value

- **Type** : `integer`
- Le delay en seconds. The values possibles sont : 60, 300, 900, 1800, 3600.

| Secondes | Équivaslow |
|----------|------------|
| 60 | 1 minute |
| 300 | 5 minutes |
| 900 | 15 minutes |
| 1800 | 30 minutes |
| 3600 | 1 hour |

## Usage

### Affichage formatted

```bdfd
$var[timeout;$afkTimeout]
$if[$var[timeout]>=3600]
$var[timeoutText;$round[$divide[$var[timeout];3600]] hour(s)]
$elseIf[$var[timeout]>=60]
$var[timeoutText;$round[$divide[$var[timeout];60]] minute(s)]
$else
$var[timeoutText;$var[timeout] second(s)]
$endif
$sendMessage[💤 Delay AFK : **$var[timeoutText]**]
```

### Configuration of the server

```bdfd
$title[⚙️ Parameters de $serverName]
$addField[💤 Channel AFK;$if[$afkChannelID!=]<#$afkChannelID>$elseAucun$endif;yes]
$addField[⏱️ Delay AFK;$round[$divide[$afkTimeout;60]] minutes;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Alerte si delay très court

```bdfd
$if[$afkTimeout<=60]
$sendMessage[⚠️ Le delay AFK est très court (1 minute). The members will be déplacés quickly.]
$endif
```

## Notes

- The channel AFK est configured separatedment ; use `$afkChannelID[]` for the récupérer.
- If no channel AFK n'est configured, le timeout does not have d'effet.
- Discord limit les values possibles à la list ci-dessus (no value custome).
- Les members in the channel AFK sont mis en sourdine automatically.
