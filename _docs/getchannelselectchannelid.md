---
layout: doc
title: $getChannelSelectChannelID
translation_key: docs
category: "Entity Info"
function_name: getChannelSelectChannelID
syntax: $getChannelSelectChannelID[(index)]
description: Gets the ID of the canal selected par the user via un menu de sélection de canaux (channel select). Allows to obtenir the result d'une interaction.
---

# $getChannelSelectChannelID

The function `$getChannelSelectChannelID[]` allows **récupérer the ID of the canal** choisi par the user dans un menu de sélection de canaux (select menu de type channel).

## Syntax

```
$getChannelSelectChannelID[(index)]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | Optional - L'index du canal in the sélection (1 = first). Par default 1. |

## Return Value

- **Type** : String (Snowflake ID)
- The ID Discord du canal selected.
- String vide si no canal n'was selected.

## Behavior

- Utilisé in thes interactions de type `$onInteraction[]` or `$selectMenuInteractionID[]`.
- Functionne with thes menus de sélection de canaux (type `channel` dans `$addChannelSelectMenu[]`).
- Si the user sélectionne several canaux, utiliser `$getChannelSelectChannelIDs[]` pour all récupérer.

## Examples

### Récupération simple

```bdfd
$nominalTrigger
$addChannelSelectMenu[channel_select;1;Sélectionnez un canal à surveiller]
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

### Gestion de several sélections

```bdfd
$onInteraction[channel_select]
$let[count;$length[$splitText[$getChannelSelectChannelIDs[,];,]]]
Vous avez selected **$count** canal(s) :
$textSplit[$getChannelSelectChannelIDs[,];,]
> <#[$splitText[$index]]> (ID: $splitText[$index])
$endTextSplit
```

## Notes

- L'index commence à 1 (pas 0).
- Functionne only in thes callbacks d'interaction.
- Pour les sélections multiple, préférez `$getChannelSelectChannelIDs[]`.
- Le canal retourné can be de n'importe quel type (text, vocal, catégorie, etc.).
