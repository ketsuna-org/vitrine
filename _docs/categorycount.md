---
layout: doc
title: $categoryCount
translation_key: docs
category: "Entity Info"
function_name: categoryCount
syntax: $categoryCount
description: Retourne le nombre de catégories sur le serveur Discord.
returns:
  - type: integer
    description: Le nombre total de catégories.
related:
  - $channelCount
  - $categoryChannels
  - $channelCategoryID
examples:
  - description: Nombre de catégories
    code: "$sendMessage[Catégories : $categoryCount]"
  - description: Comparaison salons vs catégories
    code: $sendMessage[$categoryCount catégories pour $channelCount salons.]
---

# $categoryCount

La fonction `$categoryCount` retourne le **nombre total de catégories** présentes sur le serveur Discord.

## Syntaxe

```
$categoryCount
```

## Paramètres

Aucun paramètre.

## Valeur de retour

| Type | Description |
|---|---|
| `integer` | Le nombre de catégories sur le serveur. |

## Exemples

### Nombre de catégories

```bdfd
$sendMessage[Ce serveur a $categoryCount catégories.]
```

### Comparaison salons / catégories

```bdfd
$sendMessage[
**Statistiques du serveur :**
Catégories : $categoryCount
Salons : $channelCount
]
```

### Serveur sans catégories

```bdfd
$if[$categoryCount==0]
  $sendMessage[Ce serveur n'a aucune catégorie.]
$endif
```

## Notes

- Ne compte que les salons de type `category`.
- Utile pour des statistiques ou un affichage de structure du serveur.
