---
layout: doc
title: $userRoles
translation_key: docs
category: "Entity Info"
function_name: userRoles
syntax: $userRoles
description: Returns the list des IDs des roles attribués à the user on the server current.
---

# $userRoles

The variable `$userRoles` retourne la **list des IDs de roles** attribués à the user on the server où the command est executed.

## Syntax

```
$userRoles
```

## Return Value

- **Type** : List de snowflakes (strings numériques), separateds par des virgules
- Example: `123456789,987654321,555555555`
- Inclut the role `@everyone` and all roles attribués

## Behavior

- `$userRoles` ne prend **no argument**.
- Returns thes IDs de **all** les roles of the user on the server.
- L'ordre peut correspondre à la hiérarchie (du plus bas au plus haut).

## Examples

### Afficher les IDs des roles

```bdfd
$title[Roles de $userName]
$description[
The user possède les roles nexts :
`$userRoles`
]
$color[#5865F2]
$sendMessage[]
```

### Vérifier un role spécifique

```bdfd
$if[$checkContains[$userRoles;123456789012345678]==true]
  $sendMessage[Vous avez the role VIP !]
$else
  $sendMessage[Vous n'avez pas the role VIP.]
$endif
```

### Compter les roles

```bdfd
$let[count;$arrayCount[$splitText[$userRoles;,]]]
$sendMessage[Vous avez $count roles sur ce server.]
```

## Notes

- Les IDs sont des snowflakes numériques, pas des noms de roles.
- Utilisez `$roleName[ID]` pour obtenir the name of a role from son ID.
- Pour vérifier les permissions, utilisez `$userPerms` qui est plus directly exploitable.
