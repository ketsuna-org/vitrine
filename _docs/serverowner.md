---
layout: doc
title: $serverOwner[]
translation_key: docs
category: "Entity Info"
function_name: serverOwner
syntax: $serverOwner
description: Returns the identifier (ID) du owner of the server Discord.
---

# $serverOwner[] — Owner of the Server

`$serverOwner[]` retourne l'identifier Discord du owner of the server. Cet ID can be utilisé pour mentionner le owner, vérifier des permissions or restreindre des commands.

## Syntax

```
$serverOwner
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string`
- The ID (Snowflake) du owner of the server.

## Utilisation

### Mention du owner

```bdfd
$sendMessage[👑 Owner of the server : <@$serverOwner>]
```

### Restreindre une command au owner

```bdfd
$if[$authorID!=$serverOwner]
$sendMessage[⛔ Seul le owner of the server peut utiliser cette command.]
$stop
$endif
$sendMessage[Command owner executed.]
```

### Embed informatif

```bdfd
$title[Informations sur $serverName]
$description[Server géré par <@$serverOwner>]
$addField[ID Server;$serverID;yes]
$addField[Owner;$serverOwner;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Notification au owner

```bdfd
$sendMessage[<@$serverOwner>, un user demande votre attention.]
```

## Notes

- Le owner est the user qui a created the server or à qui la property was transférée.
- The ID of the owner est invariant as long as la property is not transférée.
- Utilisez `$username[$serverOwner]` pour obtenir the name du owner without the mentionner.
- Pour vérifier si the user courant est le owner, vous pouvez also utiliser `$isOwner[]`.
