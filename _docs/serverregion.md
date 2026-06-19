---
layout: doc
title: $serverRegion[]
translation_key: docs
category: "Entity Info"
function_name: serverRegion
syntax: $serverRegion
description: Returns the région vocale of the server Discord (obsolète — Discord utilise désormais le système of régions automatiques par canal vocal).
---

# $serverRegion[] — Région of the Server

`$serverRegion[]` retourne la région vocale configurede for the server Discord.

> **Note** : Dethen la mise to day of Discord en 2023, la région n'est plus configurede to the level of the server mais to the level of each canal vocal individualment. This function peut therefore retourner "automatic" on the plupart servers modernes.

## Syntax

```
$serverRegion
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string`
- La région of the server (ex: `"europe"`, `"us-west"`, `"automatic"`, etc.).

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🌍 Région : $serverRegion]
```

### Embed informatif

```bdfd
$title[Informations on $serverName]
$addField[Région;$serverRegion;yes]
$addField[Level of vérification;$serverVerificationLevel;yes]
$addField[Level of boost;$boostLevel;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Logs

```bdfd
$log[Server $serverName — Région : $serverRegion]
```

## Notes

- La région détermine la localisation géographique servers vocaux, ce qui affecte la latence.
- **Obsolète** : Discord a migré vers un système of régions automatiques par canal vocal. The value retournée peut ne plus être pertinente.
- Values possibles historiques : `brazil`, `europe`, `hongkong`, `india`, `japan`, `russia`, `singapore`, `southafrica`, `sydney`, `us-central`, `us-east`, `us-south`, `us-west`.
- Pour les servers récents, the value sera generally `"automatic"`.
