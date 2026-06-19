---
layout: doc
title: $getRoleSelectRoleIDs
translation_key: docs
category: "Entity Info"
function_name: getRoleSelectRoleIDs
syntax: $getRoleSelectRoleIDs[(separator)]
description: Gets all IDs des roles selecteds par the user via un menu de sélection de roles à choix multiple.
---

# $getRoleSelectRoleIDs

The function `$getRoleSelectRoleIDs[]` allows **récupérer l'ensemble des IDs des roles** selecteds par the user dans un menu de sélection de roles à choix multiple.

## Syntax

```
$getRoleSelectRoleIDs[(separator)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Optional - Le separator between each ID. Par default `, ` (virgule + espace). |

## Return Value

- **Type** : String
- La list de all IDs des roles selecteds.
- String vide si no role n'was selected.

## Behavior

- Utilisé with a menu de sélection de roles configured avec `maxValues > 1`.
- Returns all IDs en a single string with the separator spécifié.
- Compatible avec `$textSplit[]` pour itérer sur each role.

## Examples

### Attributeion de several roles

```bdfd
$onInteraction[role_select]
$let[roles;$getRoleSelectRoleIDs[,]]

$textSplit[$roles;,]
  $giveRole[$authorID;$splitText[$index]]
  + Role ajouté : $roleName[$splitText[$index]]
$endTextSplit

$sendMessage[✅ Tous les roles were attribués !]
```

### Affichage des roles selecteds

```bdfd
$onInteraction[role_select]
$let[list;$getRoleSelectRoleIDs[, ]]
$let[count;$length[$splitText[$list;, ]]]

$title[🎭 $count role(s) selected(s)]
$description[
$textSplit[$list;, ]
  $index. $roleName[$splitText[$index]]
$endTextSplit
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Pour une sélection unique, utilisez `$getRoleSelectRoleID[]`.
- Le separator can be n'importe quelle string de becauseactères.
- Utile for the systèmes d'auto-roles avec sélection multiple.
