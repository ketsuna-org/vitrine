---
layout: doc
title: $serverID[]
translation_key: docs
category: "Entity Info"
function_name: serverID
syntax: $serverID
description: Returns the identifier unique (Snowflake) of the server Discord in thequel the command est executed.
---

# $serverID[] — Identifier of the Server

`$serverID[]` retourne l'identifier unique (Snowflake) of the server Discord courant. Cet ID est un number on 18-19 chiffres qui identifie of manière permanent the server.

## Syntax

```
$serverID
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string`
- The ID of the server sous forme of string numérique.

## Utilisation

### Affichage of the ID

```bdfd
$sendMessage[ID of the server : $serverID]
```

### Restrict une command to un server specific

```bdfd
$if[$serverID!=123456789012345678]
$sendMessage[Cette command is not available on ce server.]
$stop
$endif
$sendMessage[Command executed with success !]
```

### Logs with identifier

```bdfd
$log[Action effectuée on the server $serverID ($serverName)]
```

### Link vers un channel of the server

```bdfd
$sendMessage[Rejoignez the channel général : https://discord.com/channels/$serverID/$channelID[général]]
```

## Notes

- `$serverID[]` est un alias of `$guildID[]`.
- The ID est invariant : il ne change never, contrairement to the nom of the server.
- Utile pour identifier of manière fiable un server in thes conditions and les logs.
- Utilisable pour construire URLs Discord (channels, messages, etc.).
