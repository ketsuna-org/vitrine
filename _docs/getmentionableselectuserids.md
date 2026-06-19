---
layout: doc
title: $getMentionableSelectUserIDs
translation_key: docs
category: "Entity Info"
function_name: getMentionableSelectUserIDs
syntax: $getMentionableSelectUserIDs[(separator)]
description: Gets all IDs entités mentionnables (users and roles) selectedes via un menu mentionnable to choix multiple.
---

# $getMentionableSelectUserIDs

The function `$getMentionableSelectUserIDs[]` allows **récupérer all IDs entités mentionnables** selectedes par the user in a menu of sélection mentionnable to choix multiple.

## Syntax

```
$getMentionableSelectUserIDs[(separator)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Optional - Le separator between each ID. Par default `, ` (virgule + espace). |

## Return Value

- **Type** : String
- La list complete IDs selecteds.
- String vide si noe entité n'was selectede.

## Behavior

- Returns to la fois les IDs of users ET of roles.
- Compatible with `$textSplit[]` pour traitement individual.
- Le menu doit permettre les choix multiple (`maxValues > 1`).

## Examples

### List entités choisies

```bdfd
$onInteraction[mention_select]
$let[list;$getMentionableSelectUserIDs[, ]]
$title[📋 Entités selectedes]
$description[$list]
$sendMessage[]
```

### Boucle of traitement

```bdfd
$onInteraction[mention_select]
$let[list;$getMentionableSelectUserIDs[,]]
$textSplit[$list;,]
  $if[$hasRole[$splitText[$index];$guildID]==true]
    Role : $roleName[$splitText[$index]]
  $else
    User : $userName[$splitText[$index]]
  $endif
$endTextSplit
```

## Notes

- Pour a single sélection, utilisez `$getMentionableSelectUserID[]`.
- Les IDs can be mixtes (users and roles in the même list).
- Utilisez `$hasRole[]` pour distinguer un role of a user.
