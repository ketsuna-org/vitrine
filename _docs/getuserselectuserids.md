---
layout: doc
title: $getUserSelectUserIDs
translation_key: docs
category: "Entity Info"
function_name: getUserSelectUserIDs
syntax: $getUserSelectUserIDs[(separator)]
description: Gets all IDs users selecteds via un menu of sélection of users to choix multiple.
---

# $getUserSelectUserIDs

The function `$getUserSelectUserIDs[]` allows **récupérer l'ensemble IDs users** selecteds in a menu of sélection of users to choix multiple.

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
- La list of all IDs users selecteds.
- String vide si no user n'was selected.

## Behavior

- Utilisé with a menu of sélection of users configured with `maxValues > 1`.
- Returns all IDs en a single string.
- Idéal for the actions of masse (DM groupés, attributeion of roles, etc.).

## Examples

### DM groupé

```bdfd
$onInteraction[user_select]
$let[users;$getUserSelectUserIDs[,]]

$textSplit[$users;,]
  $sendDM[$splitText[$index];📢 Message important of **$serverName** !]
$endTextSplit

$title[✅ Messages sents]
$description[Tous les users selecteds ont received un DM.]
$color[#57F287]
$sendMessage[]
```

### Attributeion of role groupée

```bdfd
$onInteraction[user_select]
$let[users;$getUserSelectUserIDs[,]]
$let[count;$length[$splitText[$users;,]]]

$textSplit[$users;,]
  $giveRole[$splitText[$index];$roleID[Member]]
$endTextSplit

$title[🎭 Role attribué]
$description[The role **Member** was donné to **$count** user(s).]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Pour une sélection unique, utilisez `$getUserSelectUserID[]`.
- Compatible with `$textSplit[]` pour itérer on each user.
- Utile for the commands of modération or of administration en lot.
