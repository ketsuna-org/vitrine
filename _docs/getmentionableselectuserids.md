---
layout: doc
title: $getMentionableSelectUserIDs
translation_key: docs
category: "Entity Info"
function_name: getMentionableSelectUserIDs
syntax: $getMentionableSelectUserIDs[(separator)]
description: Récupère tous les IDs des entités mentionnables (utilisateurs et rôles) sélectionnées via un menu mentionnable à choix multiples.
parameters:
  - name: separator
    description: (Optionnel) Le séparateur entre les IDs. Par défaut ", ".
returns:
  - type: string
    description: La liste des IDs sélectionnés, séparés par le délimiteur choisi.
related:
  - $getMentionableSelectUserID
  - $getUserSelectUserIDs
  - $getRoleSelectRoleIDs
examples:
  - description: Tous les mentionnables (virgule)
    code: $getMentionableSelectUserIDs[, ]
  - description: Avec séparateur point-virgule
    code: $getMentionableSelectUserIDs[;]
---

# $getMentionableSelectUserIDs

La fonction `$getMentionableSelectUserIDs[]` permet de **récupérer tous les IDs des entités mentionnables** sélectionnées par l'utilisateur dans un menu de sélection mentionnable à choix multiples.

## Syntaxe

```
$getMentionableSelectUserIDs[(separator)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `separator` | Optionnel - Le séparateur entre chaque ID. Par défaut `, ` (virgule + espace). |

## Valeur de retour

- **Type** : String
- La liste complète des IDs sélectionnés.
- Chaîne vide si aucune entité n'a été sélectionnée.

## Comportement

- Retourne à la fois les IDs d'utilisateurs ET de rôles.
- Compatible avec `$textSplit[]` pour traitement individuel.
- Le menu doit permettre les choix multiples (`maxValues > 1`).

## Exemples

### Liste des entités choisies

```bdfd
$onInteraction[mention_select]
$let[list;$getMentionableSelectUserIDs[, ]]
$title[📋 Entités sélectionnées]
$description[$list]
$sendMessage[]
```

### Boucle de traitement

```bdfd
$onInteraction[mention_select]
$let[list;$getMentionableSelectUserIDs[,]]
$textSplit[$list;,]
  $if[$hasRole[$splitText[$index];$guildID]==true]
    Rôle : $roleName[$splitText[$index]]
  $else
    Utilisateur : $userName[$splitText[$index]]
  $endif
$endTextSplit
```

## Notes

- Pour une seule sélection, utilisez `$getMentionableSelectUserID[]`.
- Les IDs peuvent être mixtes (utilisateurs et rôles dans la même liste).
- Utilisez `$hasRole[]` pour distinguer un rôle d'un utilisateur.
