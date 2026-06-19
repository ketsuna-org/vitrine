---
layout: doc
title: $getChannelSelectChannelID
translation_key: docs
category: "Entity Info"
function_name: getChannelSelectChannelID
syntax: $getChannelSelectChannelID[(index)]
description: Récupère l'ID du canal sélectionné par l'utilisateur via un menu de sélection de canaux (channel select). Permet d'obtenir le résultat d'une interaction.
---

# $getChannelSelectChannelID

La fonction `$getChannelSelectChannelID[]` permet de **récupérer l'ID du canal** choisi par l'utilisateur dans un menu de sélection de canaux (select menu de type channel).

## Syntaxe

```
$getChannelSelectChannelID[(index)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `index` | Optionnel - L'index du canal dans la sélection (1 = premier). Par défaut 1. |

## Valeur de retour

- **Type** : String (Snowflake ID)
- L'ID Discord du canal sélectionné.
- Chaîne vide si aucun canal n'a été sélectionné.

## Comportement

- Utilisé dans les interactions de type `$onInteraction[]` ou `$selectMenuInteractionID[]`.
- Fonctionne avec les menus de sélection de canaux (type `channel` dans `$addChannelSelectMenu[]`).
- Si l'utilisateur sélectionne plusieurs canaux, utiliser `$getChannelSelectChannelIDs[]` pour tous les récupérer.

## Exemples

### Récupération simple

```bdfd
$nominalTrigger
$addChannelSelectMenu[channel_select;1;Sélectionnez un canal à surveiller]
$sendMessage[Veuillez choisir un canal :]

$onInteraction[channel_select]
$let[channelID;$getChannelSelectChannelID]
$title[Canal sélectionné]
$description[
**ID :** $channelID
**Nom :** $channelName[$channelID]
]
$sendMessage[]
```

### Gestion de plusieurs sélections

```bdfd
$onInteraction[channel_select]
$let[count;$length[$splitText[$getChannelSelectChannelIDs[,];,]]]
Vous avez sélectionné **$count** canal(s) :
$textSplit[$getChannelSelectChannelIDs[,];,]
> <#[$splitText[$index]]> (ID: $splitText[$index])
$endTextSplit
```

## Notes

- L'index commence à 1 (pas 0).
- Fonctionne uniquement dans les callbacks d'interaction.
- Pour les sélections multiples, préférez `$getChannelSelectChannelIDs[]`.
- Le canal retourné peut être de n'importe quel type (texte, vocal, catégorie, etc.).
