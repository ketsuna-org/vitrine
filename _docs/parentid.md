---
layout: doc
title: $parentID
translation_key: docs
category: "Entity Info"
function_name: parentID
syntax: $parentID[(channelID)]
description: Alias de $channelCategoryID. Retourne l'ID de la catégorie parente d'un salon.
parameters:
  - name: channelID
    description: "Optionnel. L'ID du salon cible. Si omis, utilise le salon courant."
returns:
  - type: snowflake (string)
    description: L'ID de la catégorie parente, ou une chaîne vide si aucune.
related:
  - $channelCategoryID
  - $categoryID
  - $categoryChannels
examples:
  - description: Catégorie parente du salon courant
    code: "$sendMessage[Catégorie ID : $parentID]"
  - description: Nom de la catégorie parente
    code: "$sendMessage[Catégorie : $channelName[$parentID]]"
---

# $parentID

La fonction `$parentID` est un **alias** de `$channelCategoryID`. Elle retourne l'ID de la catégorie parente d'un salon Discord.

## Syntaxe

```
$parentID[(channelID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | Optionnel. L'ID du salon cible. Si omis, le salon courant est utilisé. |

## Valeur de retour

| Type | Description |
|---|---|
| `snowflake` (string) | L'ID de la catégorie parente, ou `""` si aucune. |

## Exemples

### ID de la catégorie

```bdfd
$sendMessage[ID catégorie : $parentID]
```

### Nom de la catégorie parente

```bdfd
$sendMessage[Catégorie parente : $channelName[$parentID]]
```

### Vérifier si dans une catégorie

```bdfd
$if[$parentID!=]
  $sendMessage[Ce salon est dans la catégorie $channelName[$parentID]]
$else
  $sendMessage[Ce salon n'est pas dans une catégorie.]
$endif
```

## Notes

- `$parentID` et `$categoryID` sont tous deux des alias de `$channelCategoryID`.
- Fonctionnement identique à `$channelCategoryID`.
