---
layout: doc
title: $getRoleColor
translation_key: docs
category: "Moderation"
function_name: getRoleColor
syntax: $getRoleColor[roleID]
description: Récupère la couleur hexadécimale d'un rôle Discord. Retourne la couleur au format #RRGGBB.
---

# $getRoleColor

La fonction `$getRoleColor[]` permet de **récupérer la couleur hexadécimale** d'un rôle Discord.

## Syntaxe

```
$getRoleColor[roleID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `roleID` | L'ID Discord du rôle. |

## Valeur de retour

- **Type** : String
- La couleur au format hexadécimal `#RRGGBB`.
- `#000000` (noir) si le rôle n'a pas de couleur définie (couleur par défaut).

## Comportement

- Extrait la couleur configurée pour le rôle.
- Retourne `#000000` pour les rôles sans couleur (transparent par défaut).
- La couleur est utilisable directement dans `$color[]` ou tout autre contexte nécessitant une couleur.

## Exemples

### Affichage simple

```bdfd
$let[roleID;$roleID[Admin]]
Couleur du rôle **$roleName[$roleID]** : $getRoleColor[$roleID]
```

### Embed coloré selon le rôle

```bdfd
$let[roleID;$highestRole[$authorID]]
$title[👤 Profil de $userName]
$description[
**Rôle principal :** $roleName[$roleID]
**Couleur :** $getRoleColor[$roleID]
]
$color[$getRoleColor[$roleID]]
$thumbnail[$userAvatar[$authorID]]
$sendMessage[]
```

### Palette de rôles

```bdfd
$title[🎨 Couleurs des rôles]
$description[
$textSplit[$serverRoles[,];, ]
  $index. $roleName[$splitText[$index]] — $getRoleColor[$splitText[$index]]
$endTextSplit
]
$sendMessage[]
```

### Embed dynamique

```bdfd
$let[color;$getRoleColor[$highestRole[$authorID]]]

$if[$color==#000000]
  $let[color;#5865F2]
$endif

$title[Titre]
$description[Description]
$color[$color]
$sendMessage[]
```

## Notes

- Si le rôle a une couleur par défaut (pas de couleur), `$getRoleColor` retourne `#000000`.
- Bonus : utilisez `$if[$getRoleColor[$roleID]==#000000]` pour détecter les rôles sans couleur.
- La couleur est compatible avec la fonction `$color[]` des embeds.
