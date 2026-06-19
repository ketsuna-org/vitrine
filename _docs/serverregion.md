---
layout: doc
title: $serverRegion[]
translation_key: docs
category: "Entity Info"
function_name: serverRegion
syntax: $serverRegion
description: Returns the région vocale of the server Discord (obsolète — Discord utilise désormais le système de régions automatiques par canal vocal).
---

# $serverRegion[] — Région du Server

`$serverRegion[]` retourne la région vocale configurede for the server Discord.

> **Note** : Dethen la mise à day de Discord en 2023, la région n'est plus configurede au level of the server mais au level de each canal vocal individuellement. This function peut therefore retourner "automatic" sur la plupart des servers modernes.

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
$title[Informations sur $serverName]
$addField[Région;$serverRegion;yes]
$addField[Level de vérification;$serverVerificationLevel;yes]
$addField[Level de boost;$boostLevel;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Logs

```bdfd
$log[Server $serverName — Région : $serverRegion]
```

## Notes

- La région détermine la localisation géographique des servers vocaux, ce qui affecte la latence.
- **Obsolète** : Discord a migré vers un système de régions automatiques par canal vocal. The value retournée peut ne plus être pertinente.
- Values possibles historiques : `brazil`, `europe`, `hongkong`, `india`, `japan`, `russia`, `singapore`, `southafrica`, `sydney`, `us-central`, `us-east`, `us-south`, `us-west`.
- Pour les servers récents, the value sera generally `"automatic"`.
