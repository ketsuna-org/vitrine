---
layout: doc
title: $getRoleSelectRoleIDs
translation_key: docs
category: "Entity Info"
function_name: getRoleSelectRoleIDs
syntax: $getRoleSelectRoleIDs[(separator)]
description: Récupère tous les IDs des rôles sélectionnés par l'utilisateur via un menu de sélection de rôles à choix multiples.
---

# $getRoleSelectRoleIDs

La fonction `$getRoleSelectRoleIDs[]` permet de **récupérer l'ensemble des IDs des rôles** sélectionnés par l'utilisateur dans un menu de sélection de rôles à choix multiples.

## Syntaxe

```
$getRoleSelectRoleIDs[(separator)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `separator` | Optionnel - Le séparateur entre chaque ID. Par défaut `, ` (virgule + espace). |

## Valeur de retour

- **Type** : String
- La liste de tous les IDs des rôles sélectionnés.
- Chaîne vide si aucun rôle n'a été sélectionné.

## Comportement

- Utilisé avec un menu de sélection de rôles configuré avec `maxValues > 1`.
- Retourne tous les IDs en une seule chaîne avec le séparateur spécifié.
- Compatible avec `$textSplit[]` pour itérer sur chaque rôle.

## Exemples

### Attribution de plusieurs rôles

```bdfd
$onInteraction[role_select]
$let[roles;$getRoleSelectRoleIDs[,]]

$textSplit[$roles;,]
  $giveRole[$authorID;$splitText[$index]]
  + Rôle ajouté : $roleName[$splitText[$index]]
$endTextSplit

$sendMessage[✅ Tous les rôles ont été attribués !]
```

### Affichage des rôles sélectionnés

```bdfd
$onInteraction[role_select]
$let[list;$getRoleSelectRoleIDs[, ]]
$let[count;$length[$splitText[$list;, ]]]

$title[🎭 $count rôle(s) sélectionné(s)]
$description[
$textSplit[$list;, ]
  $index. $roleName[$splitText[$index]]
$endTextSplit
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Pour une sélection unique, utilisez `$getRoleSelectRoleID[]`.
- Le séparateur peut être n'importe quelle chaîne de caractères.
- Utile pour les systèmes d'auto-rôles avec sélection multiple.
