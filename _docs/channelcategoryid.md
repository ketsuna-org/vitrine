---
layout: doc
title: $channelCategoryID
translation_key: docs
category: "Entity Info"
function_name: channelCategoryID
syntax: $channelCategoryID[(channelID)]
description: Retourne l'ID de la catégorie parente d'un salon Discord.
parameters:
  - name: channelID
    description: "Optionnel. L'ID du salon cible. Si omis, utilise le salon courant."
returns:
  - type: snowflake (string)
    description: L'ID de la catégorie parente, ou une chaîne vide si le salon n'est pas dans une catégorie.
related:
  - $categoryID
  - $parentID
  - $categoryChannels
  - $channelID
examples:
  - description: Catégorie du salon courant
    code: $sendMessage[Catégorie ID : $channelCategoryID]
  - description: Vérifier si dans une catégorie
    code: |
      $if[$channelCategoryID!=]
        $sendMessage[Catégorie : $channelCategoryID]
      $else
        $sendMessage[Ce salon n'est pas dans une catégorie.]
      $endif
---

# $channelCategoryID

La fonction `$channelCategoryID` retourne l'**ID de la catégorie parente** d'un salon Discord. Si le salon n'appartient à aucune catégorie, la fonction retourne une chaîne vide.

## Syntaxe

```
$channelCategoryID[(channelID)]
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

### Obtenir la catégorie parente

```bdfd
$sendMessage[ID de la catégorie : $channelCategoryID]
```

### Nom de la catégorie parente

```bdfd
$sendMessage[Catégorie : $channelName[$channelCategoryID]]
```

### Vérifier l'appartenance à une catégorie

```bdfd
$if[$channelCategoryID==123456789012345678]
  $sendMessage[Ce salon est dans la catégorie Administration.]
$else
  $sendMessage[Ce salon est dans une autre catégorie.]
$endif
```

### Salon hors catégorie

```bdfd
$if[$channelCategoryID==]
  $sendMessage[Ce salon n'appartient à aucune catégorie.]
$endif
```

## Notes

- `$parentID` et `$categoryID` sont des alias de `$channelCategoryID`.
- Les salons DM n'ont pas de catégorie parente.
- Les catégories elles-mêmes n'ont pas de catégorie parente.
