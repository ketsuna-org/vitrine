---
layout: doc
title: $serverRegion[]
translation_key: docs
category: "Entity Info"
function_name: serverRegion
syntax: $serverRegion
description: Retourne la région vocale du serveur Discord (obsolète — Discord utilise désormais le système de régions automatiques par canal vocal).
---

# $serverRegion[] — Région du Serveur

`$serverRegion[]` retourne la région vocale configurée pour le serveur Discord.

> **Note** : Depuis la mise à jour de Discord en 2023, la région n'est plus configurée au niveau du serveur mais au niveau de chaque canal vocal individuellement. Cette fonction peut donc retourner "automatic" sur la plupart des serveurs modernes.

## Syntaxe

```
$serverRegion
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `string`
- La région du serveur (ex: `"europe"`, `"us-west"`, `"automatic"`, etc.).

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🌍 Région : $serverRegion]
```

### Embed informatif

```bdfd
$title[Informations sur $serverName]
$addField[Région;$serverRegion;yes]
$addField[Niveau de vérification;$serverVerificationLevel;yes]
$addField[Niveau de boost;$boostLevel;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Logs

```bdfd
$log[Serveur $serverName — Région : $serverRegion]
```

## Notes

- La région détermine la localisation géographique des serveurs vocaux, ce qui affecte la latence.
- **Obsolète** : Discord a migré vers un système de régions automatiques par canal vocal. La valeur retournée peut ne plus être pertinente.
- Valeurs possibles historiques : `brazil`, `europe`, `hongkong`, `india`, `japan`, `russia`, `singapore`, `southafrica`, `sydney`, `us-central`, `us-east`, `us-south`, `us-west`.
- Pour les serveurs récents, la valeur sera généralement `"automatic"`.
