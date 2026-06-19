---
layout: doc
title: $serverInfo[]
translation_key: docs
category: "Entity Info"
function_name: serverInfo
syntax: $serverInfo[property]
description: Returns ae property specific of l'object server (or l'object complete without argument). Allows to accéder dynamicment to the information of the server.
---

# $serverInfo[] — Informations of the Server

`$serverInfo[]` est une function polyvaslowe qui allows to accéder to the information of the server. Sans argument, elle retourne l'object complete ; with a nom of property, elle retourne the value specific.

## Syntax

```
$serverInfo
$serverInfo[property]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `property` | No | — | Name of the property to récupérer. |

## Propertys availables

| Property | Description | Équivaslow |
|-----------|-------------|------------|
| `name` | Nom of the server | `$serverName` |
| `id` | ID of the server | `$serverID` |
| `icon` | URL of the icon | `$serverIcon` |
| `ownerID` | ID of the owner | `$serverOwner` |
| `description` | Description of the server | `$serverDescription` |
| `region` | Région of the server | `$serverRegion` |
| `verificationLevel` | Level of vérification | `$serverVerificationLevel` |
| `memberCount` | Number of members | `$membersCount` |
| `boostCount` | Number of boosts | `$serverBoostCount` |
| `boostLevel` | Level of boost | `$boostLevel` |
| `emojiCount` | Number of emojis | `$emojiCount` |
| `banner` | URL of the banner | `$serverBanner` |
| `vanityURL` | Code URL custome | `$serverVanityURL` |

## Utilisation

### Récupérer une property

```bdfd
$sendMessage[Nom of the server : **$serverInfo[name]**]
$sendMessage[Owner : <@$serverInfo[ownerID]>]
```

### Récupérer all information

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
- Les noms of propertys sont sensibles to la casse (camelCase).
- Préférez les functions dédiées (`$serverName`, `$serverID`, etc.) for a usage simple — `$serverInfo[]` est utile pour accès dynamics.
- Toutes les propertys are not toudays availables (ex: `banner` si level boost insuffisant).
