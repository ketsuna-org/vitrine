---
layout: doc
title: $categoryID
translation_key: docs
category: "Entity Info"
function_name: categoryID
syntax: $categoryID[(channelID)]
description: Alias de $channelCategoryID. Returns the ID of the catégorie parente of a channel.
---

# $categoryID

The `$categoryID` function est un **alias** de `$channelCategoryID`. Elle returns the ID of the catégorie à laquelle appartient the channel courant (or the channel spécifié).

## Syntax

```
$categoryID[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the channel cible. If omitted, the channel courant is used. |

## Return value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the catégorie parente, or `""` if the channel is not dans une catégorie. |

## Examples

### Obtenir the ID of the catégorie

```bdfd
$sendMessage[ID catégorie : $categoryID]
```

### Afficher the name de la catégorie

```bdfd
$if[$categoryID!=]
  $sendMessage[Catégorie : $channelName[$categoryID]]
$else
  $sendMessage[Ce channel is not dans une catégorie.]
$endif
```

### Listr les channels de la même catégorie

```bdfd
$sendMessage[Autres channels dans cette catégorie : $categoryChannels[$categoryID]]
```

## Notes

- `$categoryID` and `$parentID` sont des alias de `$channelCategoryID`.
- Returns a string vide for channels hors catégorie and les DM.
