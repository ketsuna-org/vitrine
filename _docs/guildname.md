---
layout: doc
title: $guildName[]
translation_key: docs
category: "Entity Info"
function_name: guildName
syntax: $guildName
description: Alias de $serverName. Returns the nom of the server Discord.
---

# $guildName[] — Name of the Server (Alias)

`$guildName[]` est un alias de `$serverName[]`. Il retourne the name of the server Discord in thequel the command est executed.

## Syntax

```
$guildName
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string`
- The name current of the server.

## Utilisation

### Message de bienvenue

```bdfd
$sendMessage[Bienvenue sur **$guildName**, $username ! 🎉]
```

### Embed custom

```bdfd
$title[$guildName — Informations]
$description[Tout ce que vous devez savoir sur $guildName]
$addField[ID;$guildID;yes]
$addField[Members;$membersCount;yes]
$thumbnail[$guildIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Logs

```bdfd
$log[New command executed sur $guildName ($guildID)]
```

### Condition

```bdfd
$if[$guildName==Mon Server]
$sendMessage[Vous êtes on the server principal !]
$endif
```

## Notes

- `$guildName[]` and `$serverName[]` sont interchangeables.
- Le terme "guild" provient de l'API Discord (Discord API Guilds).
- The name retourné est toudays the name current, reflétant tout changement récent.
