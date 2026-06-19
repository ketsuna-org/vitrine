---
layout: doc
title: $serverName[]
translation_key: docs
category: "Entity Info"
function_name: serverName
syntax: $serverName
description: Returns the nom of the server (guild) in thequel the command est executed.
---

# $serverName[] — Name of the Server

`$serverName[]` retourne the name of the server Discord in thequel the command est executed.

## Syntax

```
$serverName
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string`
- The name current of the server.

## Utilisation

### Message of bienvenue

```bdfd
$sendMessage[Bienvenue on **$serverName** ! Nous sommes hourux of vous count parmi nous.]
```

### Embed with the nom of the server

```bdfd
$title[$serverName — Règlement]
$description[Merci of lire attentivement le règlement of $serverName.]
$color[#E74C3C]
$sendEmbedMessage
```

### Logs

```bdfd
$log[The command was executed on the server : $serverName]
```

### Condition on the name

```bdfd
$if[$serverName==Mon Server]
$sendMessage[Bienvenue on the server principal !]
$else
$sendMessage[Bienvenue on $serverName !]
$endif
```

## Notes

- `$serverName[]` est un alias of `$guildName[]`.
- The value retournée est dynamic : elle reflète the name current of the server, même s'il was changé récemment.
- Utile pour personnaliser les messages en function of the server.
