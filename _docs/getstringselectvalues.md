---
layout: doc
title: $getStringSelectValues
translation_key: docs
category: "Entity Info"
function_name: getStringSelectValues
syntax: $getStringSelectValues[(separator)]
description: Gets all values options selectedes in a menu of sélection of strings to choix multiple.
---

# $getStringSelectValues

The function `$getStringSelectValues[]` allows **récupérer all values** options choisies par the user in a menu of sélection of strings to choix multiple.

## Syntax

```
$getStringSelectValues[(separator)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Optional - Le separator between each value. Par default `, ` (virgule + espace). |

## Return Value

- **Type** : String
- La list of all values selectedes, separatedes par le délimitur.
- String vide si noe option n'was selectede.

## Behavior

- Utilisé with a menu of strings configured with `maxValues > 1`.
- Returns thes values (pas les labels) options choisies.
- Allows traiter several choix en a single interaction.

## Examples

### Traitement of several choix

```bdfd
$onInteraction[menu]
$let[vals;$getStringSelectValues[,]]

Vous avez selected :
$textSplit[$vals;,]
  - Option : $splitText[$index]
$endTextSplit

$sendMessage[]
```

### Boucle conditionnelle

```bdfd
$onInteraction[menu]
$let[choices;$getStringSelectValues[,]]

$textSplit[$choices;,]
  $if[$splitText[$index]==notif]
    $sendDM[$authorID;🔔 Notifications enabledes !]
  $elseif[$splitText[$index]==news]
    $sendDM[$authorID;📰 Newsletter enablede !]
  $endif
$endTextSplit
```

## Notes

- Pour une sélection unique, utilisez `$getStringSelectValue[]`.
- Le separator can be custom pour faciliter le parsing.
- Les values sont définies in `$addStringSelectMenu[]`.
