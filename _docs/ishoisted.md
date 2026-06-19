---
layout: doc
title: $isHoisted
translation_key: docs
category: "Entity Info"
function_name: isHoisted
syntax: $isHoisted
description: Returns "true" si the role le plus haut of the user est displayed separatedment in the list des members, "false" otherwise.
---

# $isHoisted

The variable `$isHoisted` retourne `"true"` si the role le plus haut of the user est **displayed separatedment** (hoisted) in the list des members of the server.

## Syntax

```
$isHoisted
```

## Return Value

- **Type** : String `"true"` or `"false"`
- `"true"` : the role est displayed separatedment in the sidebar des members
- `"false"` : the role is not mis en before

## Behavior

- `$isHoisted` ne prend **no argument**.
- Un role "hoisted" apparaît dans une section separatede de la list des members online.
- La property "hoist" est configurede in thes parameters of the role on Discord.

## Examples

### Vérifier le status hoist

```bdfd
$if[$isHoisted==true]
  $sendMessage[Votre role principal est visible separatedment.]
$else
  $sendMessage[Votre role est in the catégorie générale des members.]
$endif
```

### Détection pour tri

```bdfd
$title[Status des roles]
$description[
**Role principal hoisted :** $isHoisted
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Le "hoist" est une property de **role**, pas directly of the user.
- `$isHoisted` vérifie if the **role le plus haut** of the user est hoisted.
- Utile for the classements or les systèmes de hiérarchie visuelle.
