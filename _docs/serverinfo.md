---
layout: doc
title: $serverInfo[]
translation_key: docs
category: "Entity Info"
function_name: serverInfo
syntax: $serverInfo[property]
description: Retourne une propriété spécifique de l'objet serveur (ou l'objet complet sans argument). Permet d'accéder dynamiquement aux informations du serveur.
parameters:
  - name: property
    type: string
    required: false
    description: "La propriété à récupérer (ex: \"name\", \"id\", \"icon\", \"ownerID\", etc.). Si omise, retourne un objet JSON contenant toutes les informations."
returns:
  type: string/object
  description: La valeur de la propriété demandée, ou l'objet serveur complet si aucun argument.
related:
  - $serverName
  - $serverID
  - $serverOwner
  - $serverIcon
  - $guildID
examples:
  - description: Récupérer une propriété
    code: |
      $sendMessage[Nom : $serverInfo[name]]
  - description: Récupérer toutes les infos
    code: |
      $sendMessage[$serverInfo]
---

# $serverInfo[] — Informations du Serveur

`$serverInfo[]` est une fonction polyvalente qui permet d'accéder aux informations du serveur. Sans argument, elle retourne l'objet complet ; avec un nom de propriété, elle retourne la valeur spécifique.

## Syntaxe

```
$serverInfo
$serverInfo[propriété]
```

## Paramètres

| Paramètre | Obligatoire | Défaut | Description |
|-----------|-------------|--------|-------------|
| `propriété` | Non | — | Nom de la propriété à récupérer. |

## Propriétés disponibles

| Propriété | Description | Équivalent |
|-----------|-------------|------------|
| `name` | Nom du serveur | `$serverName` |
| `id` | ID du serveur | `$serverID` |
| `icon` | URL de l'icône | `$serverIcon` |
| `ownerID` | ID du propriétaire | `$serverOwner` |
| `description` | Description du serveur | `$serverDescription` |
| `region` | Région du serveur | `$serverRegion` |
| `verificationLevel` | Niveau de vérification | `$serverVerificationLevel` |
| `memberCount` | Nombre de membres | `$membersCount` |
| `boostCount` | Nombre de boosts | `$serverBoostCount` |
| `boostLevel` | Niveau de boost | `$boostLevel` |
| `emojiCount` | Nombre d'émojis | `$emojiCount` |
| `banner` | URL de la bannière | `$serverBanner` |
| `vanityURL` | Code URL personnalisée | `$serverVanityURL` |

## Utilisation

### Récupérer une propriété

```bdfd
$sendMessage[Nom du serveur : **$serverInfo[name]**]
$sendMessage[Propriétaire : <@$serverInfo[ownerID]>]
```

### Récupérer toutes les informations

```bdfd
$title[Informations complètes du serveur]
$description[Données brutes du serveur]
$addField[Objet serveur;$serverInfo;no]
$color[#5865F2]
$sendEmbedMessage
```

### Utilisation dynamique

```bdfd
$var[prop;$message[1]]
$if[$var[prop]!=]
$sendMessage[$serverInfo[$var[prop]]]
$else
$sendMessage[Usage : !serverinfo <propriété>]
$endif
```

### Embed synthétique

```bdfd
$title[$serverInfo[name]]
$description[$serverInfo[description]]
$addField[🆔 ID;$serverInfo[id];yes]
$addField[👑 Propriétaire;<@$serverInfo[ownerID]>;yes]
$addField[👥 Membres;$serverInfo[memberCount];yes]
$addField[🚀 Boosts;$serverInfo[boostCount] (Niv. $serverInfo[boostLevel]);yes]
$addField[🎨 Émojis;$serverInfo[emojiCount];yes]
$addField[🔒 Vérification;$serverInfo[verificationLevel];yes]
$thumbnail[$serverInfo[icon]]
$image[$serverInfo[banner]]
$color[#5865F2]
$sendEmbedMessage
```

## Notes

- `$serverInfo[]` sans argument retourne un objet JSON brut — utile pour le débogage ou le logging.
- Les noms de propriétés sont sensibles à la casse (camelCase).
- Préférez les fonctions dédiées (`$serverName`, `$serverID`, etc.) pour un usage simple — `$serverInfo[]` est utile pour des accès dynamiques.
- Toutes les propriétés ne sont pas toujours disponibles (ex: `banner` si niveau boost insuffisant).
