---
layout: doc
title: $categoryChannels
translation_key: docs
category: "Entity Info"
function_name: categoryChannels
syntax: $categoryChannels[categoryID;(separator)]
description: Retourne la liste des noms des salons appartenant à une catégorie spécifique.
parameters:
  - name: categoryID
    description: L'ID de la catégorie à lister.
  - name: separator
    description: "Optionnel. Séparateur entre les noms (défaut : , )."
returns:
  - type: string
    description: Liste des noms de salons dans la catégorie.
related:
  - $channelCategoryID
  - $categoryID
  - $categoryCount
  - $channelNames
examples:
  - description: Salons de la catégorie courante
    code: $sendMessage[Salons : $categoryChannels[$categoryID]]
  - description: Avec séparateur retour à la ligne
    code: $sendMessage[Salons :\n$categoryChannels[$categoryID;\n]]
---

# $categoryChannels

La fonction `$categoryChannels` retourne la **liste des salons** appartenant à une catégorie spécifique, identifiée par son ID.

## Syntaxe

```
$categoryChannels[categoryID;(separator)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `categoryID` | L'ID de la catégorie. Obligatoire. |
| `separator` | Optionnel. Séparateur entre les noms de salons. Par défaut : `, `. |

## Valeur de retour

| Type | Description |
|---|---|
| `string` | Les noms des salons de la catégorie, séparés par le délimiteur. |

## Exemples

### Salons de la catégorie courante

```bdfd
$sendMessage[**Salons dans cette catégorie :** $categoryChannels[$categoryID]]
```

### Liste avec retours à la ligne

```bdfd
$sendMessage[
**Salons de la catégorie :**
$categoryChannels[$categoryID;
]]
```

### Salons d'une catégorie spécifique

```bdfd
$sendMessage[Salons admin : $categoryChannels[123456789012345678]]
```

### Vérifier si une catégorie est vide

```bdfd
$if[$categoryChannels[$categoryID]==]
  $sendMessage[Cette catégorie ne contient aucun salon.]
$endif
```

## Notes

- Ne liste que les salons visibles par le bot.
- La catégorie elle-même n'est pas incluse dans la liste.
- Pour lister tous les salons du serveur, utilisez `$channelNames`.
