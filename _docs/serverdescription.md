---
layout: doc
title: $serverDescription[]
translation_key: docs
category: "Entity Info"
function_name: serverDescription
syntax: $serverDescription
description: Returns the description of the server Discord (configurede in thes parameters of the server).
---

# $serverDescription[] — Description of the Server

`$serverDescription[]` retourne la description textuelle of the server Discord telle que configurede in thes parameters of the server (section "Aperçu").

## Syntax

```
$serverDescription
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string`
- La description of the server, or une string vide si noe description n'est définie.

## Utilisation

### Display la description

```bdfd
$sendMessage[📝 Description : $serverDescription]
```

### Embed informatif

```bdfd
$title[$serverName]
$description[$serverDescription]
$addField[Owner;<@$serverOwner>;yes]
$addField[Members;$membersCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Vérifier if ae description existe

```bdfd
$if[$serverDescription==]
$sendMessage[Ce server n'a pas of description.]
$else
$sendMessage[**$serverName** : $serverDescription]
$endif
```

### Restrict par mot-key in the description

```bdfd
$if[$toLowercase[$serverDescription]$contains[gaming]]
$sendMessage[Ce server est dédié to the gaming !]
$else
$sendMessage[Ce server is not catégorisé gaming.]
$endif
```

## Notes

- La description est optionalle : all servers n'en ont pas.
- La longueur maximale of une description of server est of 1000 becauseactères.
- Utile pour display information contextuelles on the server in embeds or commands of aide.
- Can be combinée with `$serverInfo[]` pour obtenir information plus completes.
