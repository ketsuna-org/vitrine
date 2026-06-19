---
layout: doc
title: $serverInfo[]
translation_key: docs
category: "Entity Info"
function_name: serverInfo
syntax: $serverInfo[property]
description: Returns ae property spécifique de l'object server (or l'object complete without argument). Allows to accéder dynamicment aux informations of the server.
---

# $serverInfo[] — Informations du Server

`$serverInfo[]` est une function polyvaslowe qui allows to accéder aux informations of the server. Sans argument, elle retourne l'object complete ; with a nom de property, elle retourne the value spécifique.

## Syntax

```
$serverInfo
$serverInfo[property]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `property` | No | — | Name of the property à récupérer. |

## Propertys availables

| Property | Description | Équivaslow |
|-----------|-------------|------------|
| `name` | Nom of the server | `$serverName` |
| `id` | ID of the server | `$serverID` |
| `icon` | URL of the icon | `$serverIcon` |
| `ownerID` | ID of the owner | `$serverOwner` |
| `description` | Description of the server | `$serverDescription` |
| `region` | Région of the server | `$serverRegion` |
| `verificationLevel` | Level de vérification | `$serverVerificationLevel` |
| `memberCount` | Number de members | `$membersCount` |
| `boostCount` | Number de boosts | `$serverBoostCount` |
| `boostLevel` | Level de boost | `$boostLevel` |
| `emojiCount` | Number d'emojis | `$emojiCount` |
| `banner` | URL of the banner | `$serverBanner` |
| `vanityURL` | Code URL custome | `$serverVanityURL` |

## Utilisation

### Récupérer une property

```bdfd
$sendMessage[Nom of the server : **$serverInfo[name]**]
$sendMessage[Owner : <@$serverInfo[ownerID]>]
```

### Récupérer all informations

```bdfd
$title[Informations completes of the server]
$description[Datas brutes of the server]
$addField[Object server;$serverInfo;no]
$color[#5865F2]
$sendEmbedMessage
```

### Utilisation dynamic

```bdfd
$var[prop;$message[1]]
$if[$var[prop]!=]
$sendMessage[$serverInfo[$var[prop]]]
$else
$sendMessage[Usage : !serverinfo <property>]
$endif
```

### Embed synthétique

```bdfd
$title[$serverInfo[name]]
$description[$serverInfo[description]]
$addField[🆔 ID;$serverInfo[id];yes]
$addField[👑 Owner;<@$serverInfo[ownerID]>;yes]
$addField[👥 Members;$serverInfo[memberCount];yes]
$addField[🚀 Boosts;$serverInfo[boostCount] (Niv. $serverInfo[boostLevel]);yes]
$addField[🎨 Emojis;$serverInfo[emojiCount];yes]
$addField[🔒 Vérification;$serverInfo[verificationLevel];yes]
$thumbnail[$serverInfo[icon]]
$image[$serverInfo[banner]]
$color[#5865F2]
$sendEmbedMessage
```

## Notes

- `$serverInfo[]` without argument retourne un JSON object brut — utile for the débogage or le logging.
- Les noms de propertys sont sensibles à la casse (camelCase).
- Préférez les functions dédiées (`$serverName`, `$serverID`, etc.) for a usage simple — `$serverInfo[]` est utile pour des accès dynamics.
- Toutes les propertys are not toudays availables (ex: `banner` si level boost insuffisant).
