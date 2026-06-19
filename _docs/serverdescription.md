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

### Afficher la description

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
$sendMessage[Ce server n'a pas de description.]
$else
$sendMessage[**$serverName** : $serverDescription]
$endif
```

### Restreindre par mot-key in the description

```bdfd
$if[$toLowercase[$serverDescription]$contains[gaming]]
$sendMessage[Ce server est dédié au gaming !]
$else
$sendMessage[Ce server is not catégorisé gaming.]
$endif
```

## Notes

- La description est optionalle : all servers n'en ont pas.
- La longueur maximale d'une description de server est de 1000 becauseactères.
- Utile pour afficher des informations contextuelles on the server dans embeds or des commands d'aide.
- Can be combinée avec `$serverInfo[]` pour obtenir des informations plus completes.
