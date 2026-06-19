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

`$serverID[]` retourne l'identifier unique (Snowflake) of the server Discord courant. Cet ID est un number sur 18-19 chiffres qui identifie de manière permanent the server.

## Syntax

```
$serverID
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string`
- The ID of the server sous forme de string numérique.

## Utilisation

### Affichage de the ID

```bdfd
$sendMessage[ID of the server : $serverID]
```

### Restreindre une command à un server spécifique

```bdfd
$if[$serverID!=123456789012345678]
$sendMessage[Cette command is not available sur ce server.]
$stop
$endif
$sendMessage[Command executed avec success !]
```

### Logs avec identifier

```bdfd
$log[Action effectuée on the server $serverID ($serverName)]
```

### Link vers un channel of the server

```bdfd
$sendMessage[Rejoignez the channel général : https://discord.com/channels/$serverID/$channelID[général]]
```

## Notes

- `$serverID[]` est un alias de `$guildID[]`.
- The ID est invariant : il ne change never, contrairement au nom of the server.
- Utile pour identifier de manière fiable un server in thes conditions and les logs.
- Utilisable pour construire des URLs Discord (channels, messages, etc.).
