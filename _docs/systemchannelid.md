---
layout: doc
title: $systemChannelID[]
translation_key: docs
category: "Entity Info"
function_name: systemChannelID
syntax: $systemChannelID
description: Returns the identifier (ID) of the channel messages système configured on the server Discord (messages of bienvenue and of boost).
---

# $systemChannelID[] — Channel Messages Système

`$systemChannelID[]` retourne the ID of the channel où Discord sends thes messages système automatiques : annonces of newx members, messages of boost Nitro, etc.

## Syntax

```
$systemChannelID
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string`
- The ID of the channel système, or une string vide si non configured.

## Utilisation

### Affichage simple

```bdfd
$if[$systemChannelID!=]
$sendMessage[📢 Les messages système are sent in <#$systemChannelID>]
$else
$sendMessage[ℹ️ Aucun channel système configured.]
$endif
```

### Embed configuration

```bdfd
$title[⚙️ Configuration of $serverName]
$addField[📢 Channel système;$if[$systemChannelID!=]<#$systemChannelID>$elseNon configured$endif;yes]
$addField[📋 Channel règles;$if[$rulesChannelID!=]<#$rulesChannelID>$elseNon configured$endif;yes]
$addField[💤 Channel AFK;$if[$afkChannelID!=]<#$afkChannelID>$elseNon configured$endif;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Log of configuration

```bdfd
$log[Configuration $serverName | Système: $systemChannelID | Règles: $rulesChannelID | AFK: $afkChannelID]
```

### Message of aide contextuel

```bdfd
$if[$systemChannelID==$channelID]
$sendMessage[ℹ️ Vous êtes in the channel messages système. The newx members and boosts sont annoncés ici.]
$endif
```

## Notes

- The channel système est configured in thes parameters of the server (onglet "Aperçu").
- Les messages concernant les newx members and les boosts Nitro sont automatically postés in ce channel.
- Si the channel is not configured, les messages système are not sents.
- Ce channel est distinct of the channel règles (`$rulesChannelID[]`).
