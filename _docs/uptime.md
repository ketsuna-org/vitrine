---
layout: doc
title: $uptime[]
translation_key: docs
category: "Misc"
function_name: uptime
syntax: $uptime
description: Returns the durée écoulée dethen le démarrage of the bot.
---

# $uptime[]

The function `$uptime[]` retourne the duration écoulée dethen le last démarrage (or redémarrage) of the bot.

## Syntax

```
$uptime
```

> **Note :** This function ne prend no parameter.

## Return Value

A string de becauseactères formattede indiquant the duration de functionnement, for example :

- `2 hours, 15 minutes, 30 seconds`
- `3 days, 5 hours, 42 minutes`
- `45 seconds`

The format exact peut varier selon the duration.

## Examples

### Uptime simple

```bdfd
The bot est online dethen $uptime.
```

### Embed de status

```bdfd
$title[📊 Status du Bot]
$addField[⏱️ Uptime;$uptime]
$addField[🏓 Ping;$ping ms]
$color[#5865F2]
```

### Command info complete

```bdfd
$title[🤖 Informations]
$description[
**Uptime :** $uptime
**Ping :** $ping ms
**Servers :** $guildCount
**Users :** $allMembersCount
]
```

## Notes

- L'uptime est réinitialisé à each redémarrage of the bot.
- Le format de sortie est automatically adapté à the duration (seconds, minutes, hours, days).
- Pour la latence of the bot, utilisez `$ping[]`.
