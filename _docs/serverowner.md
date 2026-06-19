---
layout: doc
title: $serverOwner[]
translation_key: docs
category: "Entity Info"
function_name: serverOwner
syntax: $serverOwner
description: Returns the identifier (ID) of the owner of the server Discord.
---

# $serverOwner[] — Owner of the Server

`$serverOwner[]` retourne l'identifier Discord of the owner of the server. Cet ID can be utilisé pour mentionner le owner, check permissions or restrict commands.

## Syntax

```
$serverOwner
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string`
- The ID (Snowflake) of the owner of the server.

## Utilisation

### Mention of the owner

```bdfd
$sendMessage[👑 Owner of the server : <@$serverOwner>]
```

### Restrict une command to the owner

```bdfd
$if[$authorID!=$serverOwner]
$sendMessage[⛔ Seul le owner of the server peut use cette command.]
$stop
$endif
$sendMessage[Command owner executed.]
```

### Embed informatif

```bdfd
$title[Informations on $serverName]
$description[Server géré par <@$serverOwner>]
$addField[ID Server;$serverID;yes]
$addField[Owner;$serverOwner;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Notification to the owner

```bdfd
$sendMessage[<@$serverOwner>, un user demande votre attention.]
```

## Notes

- Le owner est the user qui a created the server or to qui la property was transférée.
- The ID of the owner est invariant as long as la property is not transférée.
- Utilisez `$username[$serverOwner]` pour obtenir the name of the owner without the mentionner.
- Pour check if the user courant est le owner, vous pouvez also use `$isOwner[]`.
