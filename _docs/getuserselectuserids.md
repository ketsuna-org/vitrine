---
layout: doc
title: $getUserSelectUserIDs
translation_key: docs
category: "Entity Info"
function_name: getUserSelectUserIDs
syntax: $getUserSelectUserIDs[(separator)]
description: Gets all IDs des users selecteds via un menu de sélection d'users à choix multiple.
---

# $getUserSelectUserIDs

The function `$getUserSelectUserIDs[]` allows **récupérer l'ensemble des IDs des users** selecteds dans un menu de sélection d'users à choix multiple.

## Syntax

```
$getUserSelectUserIDs[(separator)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Optional - Le separator between each ID. Par default `, ` (virgule + espace). |

## Return Value

- **Type** : String
- La list de all IDs des users selecteds.
- String vide si no user n'was selected.

## Behavior

- Utilisé with a menu de sélection d'users configured avec `maxValues > 1`.
- Returns all IDs en a single string.
- Idéal for the actions de masse (DM groupés, attributeion de roles, etc.).

## Examples

### DM groupé

```bdfd
$onInteraction[user_select]
$let[users;$getUserSelectUserIDs[,]]

$textSplit[$users;,]
  $sendDM[$splitText[$index];📢 Message important de **$serverName** !]
$endTextSplit

$title[✅ Messages sents]
$description[Tous les users selecteds ont received un DM.]
$color[#57F287]
$sendMessage[]
```

### Attributeion de role groupée

```bdfd
$onInteraction[user_select]
$let[users;$getUserSelectUserIDs[,]]
$let[count;$length[$splitText[$users;,]]]

$textSplit[$users;,]
  $giveRole[$splitText[$index];$roleID[Member]]
$endTextSplit

$title[🎭 Role attribué]
$description[The role **Member** was donné à **$count** user(s).]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Pour une sélection unique, utilisez `$getUserSelectUserID[]`.
- Compatible avec `$textSplit[]` pour itérer sur each user.
- Utile for the commands de modération or d'administration en lot.
