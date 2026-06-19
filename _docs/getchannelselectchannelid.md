---
layout: doc
title: $getChannelSelectChannelID
translation_key: docs
category: "Entity Info"
function_name: getChannelSelectChannelID
syntax: $getChannelSelectChannelID[(index)]
description: Gets the ID of the canal selected par the user via un menu of sélection of canaux (channel select). Allows to obtenir the result of une interaction.
---

# $getChannelSelectChannelID

The function `$getChannelSelectChannelID[]` allows **récupérer the ID of the canal** choisi par the user in a menu of sélection of canaux (select menu of type channel).

## Syntax

```
$getChannelSelectChannelID[(index)]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | Optional - L'index of the canal in the sélection (1 = first). Par default 1. |

## Return Value

- **Type** : String (Snowflake ID)
- The ID Discord of the canal selected.
- String vide si no canal n'was selected.

## Behavior

- Utilisé in thes interactions of type `$onInteraction[]` or `$selectMenuInteractionID[]`.
- Functionne with thes menus of sélection of canaux (type `channel` in `$addChannelSelectMenu[]`).
- Si the user sélectionne several canaux, use `$getChannelSelectChannelIDs[]` pour all récupérer.

## Examples

### Récupération simple

```bdfd
$nominalTrigger
$addChannelSelectMenu[channel_select;1;Sélectionnez un canal to surveiller]
$sendMessage[Veuillez choisir un canal :]

$onInteraction[channel_select]
$let[channelID;$getChannelSelectChannelID]
$title[Canal selected]
$description[
**ID :** $channelID
**Nom :** $channelName[$channelID]
]
$sendMessage[]
```

### Gestion of several sélections

```bdfd
$onInteraction[channel_select]
$let[count;$length[$splitText[$getChannelSelectChannelIDs[,];,]]]
Vous avez selected **$count** canal(s) :
$textSplit[$getChannelSelectChannelIDs[,];,]
> <#[$splitText[$index]]> (ID: $splitText[$index])
$endTextSplit
```

## Notes

- L'index commence to 1 (pas 0).
- Functionne only in thes callbacks of interaction.
- Pour les sélections multiple, préférez `$getChannelSelectChannelIDs[]`.
- Le canal retourné can be of n'importe quel type (text, vocal, catégorie, etc.).
