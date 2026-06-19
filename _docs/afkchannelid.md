---
layout: doc
title: $afkChannelID[]
translation_key: docs
category: "Entity Info"
function_name: afkChannelID
syntax: $afkChannelID
description: Returns the identifier (ID) of the channel AFK configured on the server Discord.
---

# $afkChannelID[] — Channel AFK

`$afkChannelID[]` returns the ID of the channel vocal AFK (Away From Keyboard) of the server. The members inactifs in a channel vocal sont automatically déplacés vers ce channel after le delay set par `$afkTimeout[]`.

## Syntax

```
$afkChannelID
```

## Parameters

No parameters.

## Return value

- **Type** : `string`
- The ID of the channel AFK, or a string vide si non configured.

## Usage

### Affichage of the channel AFK

```bdfd
$if[$afkChannelID!=]
$sendMessage[💤 Channel AFK : <#$afkChannelID> (delay : $afkTimeout seconds)]
$else
$sendMessage[ℹ️ Auca channel AFK n'est configured sur ce server.]
$endif
```

### Embed configuration server

```bdfd
$title[⚙️ Configuration de $serverName]
$addField[💤 Channel AFK;$if[$afkChannelID!=]<#$afkChannelID>$elseNon configured$endif;yes]
$addField[⏱️ Delay AFK;$afkTimeout seconds;yes]
$addField[📋 Channel des règles;$if[$rulesChannelID!=]<#$rulesChannelID>$elseNon configured$endif;yes]
$addField[📢 Channel système;$if[$systemChannelID!=]<#$systemChannelID>$elseNon configured$endif;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Log de configuration

```bdfd
$log[Configuration server $serverName | AFK: $afkChannelID | Timeout: $afkTimeout | Règles: $rulesChannelID | Système: $systemChannelID]
```

## Notes

- The channel AFK must be a channel vocal.
- If no channel AFK n'est configured, la function retourne a string vide.
- Le delay before déplacement est donné par `$afkTimeout[]` (en seconds).
- Les members in the channel AFK sont automatically mis en sourdine par Discord.
