---
layout: doc
title: $guildName[]
translation_key: docs
category: "Entity Info"
function_name: guildName
syntax: $guildName
description: Alias de $serverName. Retourne le nom du serveur Discord.
---

# $guildName[] — Nom du Serveur (Alias)

`$guildName[]` est un alias de `$serverName[]`. Il retourne le nom du serveur Discord dans lequel la commande est exécutée.

## Syntaxe

```
$guildName
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `string`
- Le nom actuel du serveur.

## Utilisation

### Message de bienvenue

```bdfd
$sendMessage[Bienvenue sur **$guildName**, $username ! 🎉]
```

### Embed personnalisé

```bdfd
$title[$guildName — Informations]
$description[Tout ce que vous devez savoir sur $guildName]
$addField[ID;$guildID;yes]
$addField[Membres;$membersCount;yes]
$thumbnail[$guildIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Logs

```bdfd
$log[Nouvelle commande exécutée sur $guildName ($guildID)]
```

### Condition

```bdfd
$if[$guildName==Mon Serveur]
$sendMessage[Vous êtes sur le serveur principal !]
$endif
```

## Notes

- `$guildName[]` et `$serverName[]` sont interchangeables.
- Le terme "guild" provient de l'API Discord (Discord API Guilds).
- Le nom retourné est toujours le nom actuel, reflétant tout changement récent.
