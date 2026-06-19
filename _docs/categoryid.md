---
layout: doc
title: $categoryID
translation_key: docs
category: "Entity Info"
function_name: categoryID
syntax: $categoryID[(channelID)]
description: Alias de $channelCategoryID. Retourne l'ID de la catégorie parente d'un salon.
---

# $categoryID

La fonction `$categoryID` est un **alias** de `$channelCategoryID`. Elle retourne l'ID de la catégorie à laquelle appartient le salon courant (ou le salon spécifié).

## Syntaxe

```
$categoryID[(channelID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | Optionnel. L'ID du salon cible. Si omis, le salon courant est utilisé. |

## Valeur de retour

| Type | Description |
|---|---|
| `snowflake` (string) | L'ID de la catégorie parente, ou `""` si le salon n'est pas dans une catégorie. |

## Exemples

### Obtenir l'ID de la catégorie

```bdfd
$sendMessage[ID catégorie : $categoryID]
```

### Afficher le nom de la catégorie

```bdfd
$if[$categoryID!=]
  $sendMessage[Catégorie : $channelName[$categoryID]]
$else
  $sendMessage[Ce salon n'est pas dans une catégorie.]
$endif
```

### Lister les salons de la même catégorie

```bdfd
$sendMessage[Autres salons dans cette catégorie : $categoryChannels[$categoryID]]
```

## Notes

- `$categoryID` et `$parentID` sont des alias de `$channelCategoryID`.
- Retourne une chaîne vide pour les salons hors catégorie et les DM.
