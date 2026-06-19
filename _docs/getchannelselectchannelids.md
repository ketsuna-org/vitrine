---
layout: doc
title: $getChannelSelectChannelIDs
translation_key: docs
category: "Entity Info"
function_name: getChannelSelectChannelIDs
syntax: $getChannelSelectChannelIDs[(separator)]
description: Récupère tous les IDs des canaux sélectionnés par l'utilisateur via un menu de sélection de canaux. Retourne une liste séparée par le délimiteur spécifié.
---

# $getChannelSelectChannelIDs

La fonction `$getChannelSelectChannelIDs[]` permet de **récupérer l'ensemble des IDs des canaux** choisis par l'utilisateur dans un menu de sélection de canaux à choix multiples.

## Syntaxe

```
$getChannelSelectChannelIDs[(separator)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `separator` | Optionnel - Le caractère ou la chaîne qui sépare chaque ID. Par défaut `, ` (virgule + espace). |

## Valeur de retour

- **Type** : String
- La liste de tous les IDs des canaux sélectionnés, séparés par le délimiteur.
- Chaîne vide si aucun canal n'a été sélectionné.

## Comportement

- Utilisé lorsque le menu de sélection de canaux autorise les choix multiples (`maxValues > 1`).
- Retourne tous les IDs en une seule chaîne avec le séparateur spécifié.
- Compatible avec `$textSplit[]` pour itérer sur chaque canal.

## Exemples

### Liste des canaux sélectionnés

```bdfd
$onInteraction[channel_select]
$let[channels;$getChannelSelectChannelIDs[, ]]
$title[📋 Canaux sélectionnés]
$description[
**IDs :** $channels

**Liste :**
$textSplit[$channels;, ]
> <#[$splitText[$index]]>
$endTextSplit
]
$color[#5865F2]
$sendMessage[]
```

### Boucler sur chaque canal

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

- Si le menu n'accepte qu'un seul choix, utilisez `$getChannelSelectChannelID[]`.
- Le séparateur personnalisé permet une intégration facile avec d'autres fonctions.
- Idéal pour les configurations multi-canaux (logs, salons autorisés, etc.).
