---
layout: doc
title: $userRoles
translation_key: docs
category: "Entity Info"
function_name: userRoles
syntax: $userRoles
description: Retourne la liste des IDs des rôles attribués à l'utilisateur sur le serveur actuel.
parameters: []
returns:
  - type: list/array
    description: Liste des IDs de rôles (snowflakes), séparés par des virgules.
related:
  - $userPerms
  - $highestRole
  - $lowestRole
  - $memberPerms
examples:
  - description: Obtenir les rôles
    code: $userRoles
  - description: Afficher les rôles dans un profil
    code: |
      $title[Rôles de $userName]
      $description[IDs des rôles : $userRoles]
      $color[#5865F2]
      $sendMessage[]
---

# $userRoles

La variable `$userRoles` retourne la **liste des IDs de rôles** attribués à l'utilisateur sur le serveur où la commande est exécutée.

## Syntaxe

```
$userRoles
```

## Valeur de retour

- **Type** : Liste de snowflakes (chaînes numériques), séparés par des virgules
- Exemple : `123456789,987654321,555555555`
- Inclut le rôle `@everyone` et tous les rôles attribués

## Comportement

- `$userRoles` ne prend **aucun argument**.
- Retourne les IDs de **tous** les rôles de l'utilisateur sur le serveur.
- L'ordre peut correspondre à la hiérarchie (du plus bas au plus haut).

## Exemples

### Afficher les IDs des rôles

```bdfd
$title[Rôles de $userName]
$description[
L'utilisateur possède les rôles suivants :
`$userRoles`
]
$color[#5865F2]
$sendMessage[]
```

### Vérifier un rôle spécifique

```bdfd
$if[$checkContains[$userRoles;123456789012345678]==true]
  $sendMessage[Vous avez le rôle VIP !]
$else
  $sendMessage[Vous n'avez pas le rôle VIP.]
$endif
```

### Compter les rôles

```bdfd
$let[count;$arrayCount[$splitText[$userRoles;,]]]
$sendMessage[Vous avez $count rôles sur ce serveur.]
```

## Notes

- Les IDs sont des snowflakes numériques, pas des noms de rôles.
- Utilisez `$roleName[ID]` pour obtenir le nom d'un rôle à partir de son ID.
- Pour vérifier les permissions, utilisez `$userPerms` qui est plus directement exploitable.
