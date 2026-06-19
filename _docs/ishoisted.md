---
layout: doc
title: $isHoisted
translation_key: docs
category: "Entity Info"
function_name: isHoisted
syntax: $isHoisted
description: Retourne "true" si le rôle le plus haut de l'utilisateur est affiché séparément dans la liste des membres, "false" sinon.
parameters: []
returns:
  - type: boolean (string)
    description: '"true" si le rôle est hoisted (affiché séparément), "false" sinon.'
related:
  - $userRoles
  - $highestRole
  - $isAdmin
examples:
  - description: Vérifier si rôle hoisted
    code: $isHoisted
  - description: Message personnalisé pour rôles hoisted
    code: |
      $if[$isHoisted==true]
        $sendMessage[Votre rôle est affiché séparément.]
      $endif
---

# $isHoisted

La variable `$isHoisted` retourne `"true"` si le rôle le plus haut de l'utilisateur est **affiché séparément** (hoisted) dans la liste des membres du serveur.

## Syntaxe

```
$isHoisted
```

## Valeur de retour

- **Type** : Chaîne `"true"` ou `"false"`
- `"true"` : le rôle est affiché séparément dans la sidebar des membres
- `"false"` : le rôle n'est pas mis en avant

## Comportement

- `$isHoisted` ne prend **aucun argument**.
- Un rôle "hoisted" apparaît dans une section séparée de la liste des membres en ligne.
- La propriété "hoist" est configurée dans les paramètres du rôle sur Discord.

## Exemples

### Vérifier le statut hoist

```bdfd
$if[$isHoisted==true]
  $sendMessage[Votre rôle principal est visible séparément.]
$else
  $sendMessage[Votre rôle est dans la catégorie générale des membres.]
$endif
```

### Détection pour tri

```bdfd
$title[Statut des rôles]
$description[
**Rôle principal hoisted :** $isHoisted
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Le "hoist" est une propriété de **rôle**, pas directement de l'utilisateur.
- `$isHoisted` vérifie si le **rôle le plus haut** de l'utilisateur est hoisted.
- Utile pour les classements ou les systèmes de hiérarchie visuelle.
