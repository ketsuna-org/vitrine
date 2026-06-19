---
layout: doc
title: $rulesChannelID[]
translation_key: docs
category: "Entity Info"
function_name: rulesChannelID
syntax: $rulesChannelID
description: Returns the identifier (ID) of the channel règles configured on the server Discord (server Communauté).
---

# $rulesChannelID[] — Channel Règles

`$rulesChannelID[]` retourne the ID of the channel règles configured on a server Communauté Discord. Ce channel est présenté to the newx members lorsqu'ils rejoignent the server.

> **Prérequired** : The server doit avoir enabled l'option "Communauté" in their parameters.

## Syntax

```
$rulesChannelID
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string`
- The ID of the channel règles, or une string vide si non configured.

## Utilisation

### Affichage simple

```bdfd
$if[$rulesChannelID!=]
$sendMessage[📋 Règlement of the server : <#$rulesChannelID>]
$else
$sendMessage[ℹ️ Ce server n'a pas of channel règles dédié.]
$endif
```

### Message of bienvenue with link règles

```bdfd
$sendMessage[Bienvenue $username ! 
Merci of lire le règlement ici : <#$rulesChannelID> 📋]
```

### Embed configuration server

```bdfd
$title[⚙️ Configuration — $serverName]
$addField[📋 Règles;$if[$rulesChannelID!=]<#$rulesChannelID>$elseNon configured$endif;yes]
$addField[📢 Système;$if[$systemChannelID!=]<#$systemChannelID>$elseNon configured$endif;yes]
$addField[💤 AFK;$if[$afkChannelID!=]<#$afkChannelID>$elseNon configured$endif;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Redirection vers les règles

```bdfd
$if[$rulesChannelID!=$channelID]
$sendMessage[⚠️ Merci of use thes commands in a channel approprié. The règlement is available ici : <#$rulesChannelID>]
$endif
```

## Notes

- The channel règles est configured in thes parameters of server Communauté.
- Si the server is not un server Communauté, this function retourne une string vide.
- Utilisez `$serverFeatures[]` pour check if the server a enabled the functionnalité `COMMUNITY`.
- The channel est generally en lecture seule for the members standards.
