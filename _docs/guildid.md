---
layout: doc
title: $guildID[]
translation_key: docs
category: "Entity Info"
function_name: guildID
syntax: $guildID
description: Alias of $serverID. Returns the identifier unique (Snowflake) of the server Discord.
---

# $guildID[] — Identifier of the Server (Alias)

`$guildID[]` est un alias of `$serverID[]`. Il retourne l'identifier unique (Snowflake) of the server Discord courant.

## Syntax

```
$guildID
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string`
- The ID of the server sous forme of string numérique.

## Utilisation

### Affichage simple

```bdfd
$sendMessage[ID of the guilde : $guildID]
```

### Restriction of command par server

```bdfd
$if[$guildID!=123456789012345678]
$sendMessage[⛔ Cette command est réservée to the server principal.]
$stop
$endif
$sendMessage[✅ Command executed.]
```

### Logs

```bdfd
$log[Action on the server $guildID ($guildName)]
```

### Construction of URL

```bdfd
$sendMessage[Link of the server : https://discord.com/channels/$guildID]
```

## Notes

- `$guildID[]` est strictement identical to `$serverID[]`. Utilisez celui qui vous paraît le plus naturel.
- Le terme "guild" est the name technique utilisé par l'API Discord pour désigner un server.
- The ID est permanent and ne change never, contrairement to the nom.
