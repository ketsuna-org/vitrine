---
layout: doc
title: $categoryID
translation_key: docs
category: "Entity Info"
function_name: categoryID
syntax: $categoryID[(channelID)]
description: Alias of $channelCategoryID. Returns the ID of the catégorie parente of a channel.
---

# $categoryID

The `$categoryID` function est un **alias** of `$channelCategoryID`. Elle returns the ID of the catégorie to laquelle appartient the channel courant (or the channel spécifié).

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
| `snowflake` (string) | The ID of the catégorie parente, or `""` if the channel is not in a catégorie. |

## Examples

### Obtenir the ID of the catégorie

```bdfd
$sendMessage[ID catégorie : $categoryID]
```

### Display the name of la catégorie

```bdfd
$if[$categoryID!=]
  $sendMessage[Catégorie : $channelName[$categoryID]]
$else
  $sendMessage[Ce channel is not in a catégorie.]
$endif
```

### Listr les channels of la même catégorie

```bdfd
$sendMessage[Autres channels in cette catégorie : $categoryChannels[$categoryID]]
```

## Notes

- `$categoryID` and `$parentID` sont alias of `$channelCategoryID`.
- Returns a string vide for channels hors catégorie and les DM.
