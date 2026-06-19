---
layout: doc
title: $getChannelSelectChannelIDs
translation_key: docs
category: "Entity Info"
function_name: getChannelSelectChannelIDs
syntax: $getChannelSelectChannelIDs[(separator)]
description: Gets all IDs canaux selecteds par the user via un menu of sélection of canaux. Returns ae list separatede par le délimitur spécifié.
---

# $getChannelSelectChannelIDs

The function `$getChannelSelectChannelIDs[]` allows **récupérer l'ensemble IDs canaux** choisis par the user in a menu of sélection of canaux to choix multiple.

## Syntax

```
$getChannelSelectChannelIDs[(separator)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Optional - Le becauseactère or la string qui sépare each ID. Par default `, ` (virgule + espace). |

## Return Value

- **Type** : String
- La list of all IDs canaux selecteds, separateds par le délimitur.
- String vide si no canal n'was selected.

## Behavior

- Utilisé when le menu of sélection of canaux autorise les choix multiple (`maxValues > 1`).
- Returns all IDs en a single string with the separator spécifié.
- Compatible with `$textSplit[]` pour itérer on each canal.

## Examples

### List canaux selecteds

```bdfd
$onInteraction[channel_select]
$let[channels;$getChannelSelectChannelIDs[, ]]
$title[📋 Canaux selecteds]
$description[
**IDs :** $channels

**List :**
$textSplit[$channels;, ]
> <#[$splitText[$index]]>
$endTextSplit
]
$color[#5865F2]
$sendMessage[]
```

### Boucler on each canal

```bdfd
$onInteraction[channel_select]
$let[list;$getChannelSelectChannelIDs[,]]
$let[count;$length[$splitText[$list;,]]]
J'ai bien enregistré **$count** canal(s).
$textSplit[$list;,]
  Canal $index : $channelName[$splitText[$index]]
$endTextSplit
```

## Notes

- Si le menu n'accepte qu'a single choix, utilisez `$getChannelSelectChannelID[]`.
- Le separator custom allows une intégration facile with of autres functions.
- Idéal for the configurations multi-canaux (logs, channels alloweds, etc.).
