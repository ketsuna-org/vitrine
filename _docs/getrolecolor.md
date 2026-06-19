---
layout: doc
title: $getRoleColor
translation_key: docs
category: "Moderation"
function_name: getRoleColor
syntax: $getRoleColor[roleID]
description: Gets the couleur hexadecimale of a role Discord. Returns the couleur au format #RRGGBB.
---

# $getRoleColor

The function `$getRoleColor[]` allows **récupérer the color hexadecimale** of a role Discord.

## Syntax

```
$getRoleColor[roleID]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID Discord of the role. |

## Return Value

- **Type** : String
- The color au format hexadecimal `#RRGGBB`.
- `#000000` (noir) si the role n'a pas de couleur définie (couleur default).

## Behavior

- Extracted the color configurede for the role.
- Returns `#000000` for the roles without couleur (transparent default).
- The color est utilisable directly dans `$color[]` or tout autre context nécessitant une couleur.

## Examples

### Affichage simple

```bdfd
$let[roleID;$roleID[Admin]]
Couleur of the role **$roleName[$roleID]** : $getRoleColor[$roleID]
```

### Embed coloré selon the role

```bdfd
$let[roleID;$highestRole[$authorID]]
$title[👤 Profil de $userName]
$description[
**Role principal :** $roleName[$roleID]
**Couleur :** $getRoleColor[$roleID]
]
$color[$getRoleColor[$roleID]]
$thumbnail[$userAvatar[$authorID]]
$sendMessage[]
```

### Palette de roles

```bdfd
$title[🎨 Couleurs des roles]
$description[
$textSplit[$serverRoles[,];, ]
  $index. $roleName[$splitText[$index]] — $getRoleColor[$splitText[$index]]
$endTextSplit
]
$sendMessage[]
```

### Embed dynamic

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

- Si the role a une couleur default (pas de couleur), `$getRoleColor` retourne `#000000`.
- Bonus : utilisez `$if[$getRoleColor[$roleID]==#000000]` pour détecter les roles without couleur.
- The color est compatible with the function `$color[]` embeds.
