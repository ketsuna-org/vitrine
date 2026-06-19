---
layout: doc
title: $channelCategoryID
translation_key: docs
category: "Entity Info"
function_name: channelCategoryID
syntax: $channelCategoryID[(channelID)]
description: Returns the ID of the catégorie parente of a channel Discord.
---

# $channelCategoryID

The `$channelCategoryID` function returns the **ID of the catégorie parente** of a channel Discord. If the channel n'appartient à noe catégorie, la function retourne a string vide.

## Syntax

```
$channelCategoryID[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the channel cible. If omitted, the channel courant is used. |

## Return value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the catégorie parente, or `""` si noe. |

## Examples

### Obtenir la catégorie parente

```bdfd
$sendMessage[ID of the catégorie : $channelCategoryID]
```

### Name of the catégorie parente

```bdfd
$sendMessage[Catégorie : $channelName[$channelCategoryID]]
```

### Vérifier l'appartenance à une catégorie

```bdfd
$if[$channelCategoryID==123456789012345678]
  $sendMessage[Ce channel est in the catégorie Administration.]
$else
  $sendMessage[Ce channel est dans une autre catégorie.]
$endif
```

### Channel hors catégorie

```bdfd
$if[$channelCategoryID==]
  $sendMessage[Ce channel n'appartient à noe catégorie.]
$endif
```

## Notes

- `$parentID` and `$categoryID` sont des alias de `$channelCategoryID`.
- Les channels DM do not have de catégorie parente.
- Les catégories elles-mêmes do not have de catégorie parente.
