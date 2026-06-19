---
layout: doc
title: $getMentionableSelectUserIDs
translation_key: docs
category: "Entity Info"
function_name: getMentionableSelectUserIDs
syntax: $getMentionableSelectUserIDs[(separator)]
description: Gets all IDs des entités mentionnables (users and roles) selectedes via un menu mentionnable à choix multiple.
---

# $getMentionableSelectUserIDs

The function `$getMentionableSelectUserIDs[]` allows **récupérer all IDs des entités mentionnables** selectedes par the user dans un menu de sélection mentionnable à choix multiple.

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
- La list complete des IDs selecteds.
- String vide si noe entité n'was selectede.

## Behavior

- Returns à la fois les IDs d'users ET de roles.
- Compatible avec `$textSplit[]` pour traitement individuel.
- Le menu doit permettre les choix multiple (`maxValues > 1`).

## Examples

### List des entités choisies

```bdfd
$onInteraction[mention_select]
$let[list;$getMentionableSelectUserIDs[, ]]
$title[📋 Entités selectedes]
$description[$list]
$sendMessage[]
```

### Boucle de traitement

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
