---
layout: doc
title: $highestRoleWithPerms
translation_key: docs
category: "Entity Info"
function_name: highestRoleWithPerms
syntax: $highestRoleWithPerms[permission1;permission2;...]
description: Retourne l'ID du rôle le plus haut de l'utilisateur qui possède les permissions spécifiées.
parameters:
  - name: permissions
    description: Liste des permissions requises, séparées par des points-virgules (ex: "Administrator", "ManageMessages").
returns:
  - type: snowflake (string)
    description: L'ID du rôle le plus haut possédant les permissions spécifiées, ou chaîne vide si aucun rôle ne correspond.
related:
  - $highestRole
  - $lowestRoleWithPerms
  - $userPerms
  - $memberPerms
examples:
  - description: Rôle le plus haut avec permission Admin
    code: $highestRoleWithPerms[Administrator]
  - description: Rôle avec plusieurs permissions
    code: $highestRoleWithPerms[BanMembers;KickMembers]
  - description: Vérifier si un rôle avec permission existe
    code: |
      $if[$highestRoleWithPerms[ManageMessages]!=]
        $sendMessage[Rôle modérateur trouvé : $roleName[$highestRoleWithPerms[ManageMessages]]]
      $endif
---

# $highestRoleWithPerms

La fonction `$highestRoleWithPerms[]` retourne l'**ID du rôle le plus élevé** de l'utilisateur qui possède une ou plusieurs permissions spécifiques.

## Syntaxe

```
$highestRoleWithPerms[permission1;permission2;...]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `permissions` | Une ou plusieurs permissions Discord, séparées par des points-virgules. Toutes les permissions listées doivent être présentes sur le rôle. |

## Valeur de retour

- **Type** : Snowflake (chaîne numérique) ou chaîne vide
- L'ID du rôle correspondant le plus haut
- Chaîne vide si aucun rôle ne possède toutes les permissions demandées

## Comportement

- Parcourt les rôles de l'utilisateur du plus haut au plus bas.
- Retourne le **premier** rôle (le plus haut) qui possède **toutes** les permissions spécifiées.
- Les noms de permissions sont en anglais (nomenclature API Discord).

## Exemples

### Trouver le rôle modérateur

```bdfd
$let[modRole;$highestRoleWithPerms[ManageMessages]]
$if[$modRole!=]
  $sendMessage[Votre rôle de modération : $roleName[$modRole]]
$else
  $sendMessage[Vous n'avez pas de rôle de modération.]
$endif
```

### Vérifier le rôle admin

```bdfd
$if[$highestRoleWithPerms[Administrator]!=]
  $sendMessage[Vous avez un rôle administrateur.]
$endif
```

### Rôle avec permissions de bannissement

```bdfd
$let[banRole;$highestRoleWithPerms[BanMembers]]
$if[$banRole!=]
  $title[Rôle de bannissement]
  $description[
  **Rôle :** $roleName[$banRole]
  **ID :** $banRole
  ]
  $color[#ED4245]
  $sendMessage[]
$endif
```

## Notes

- Les permissions sont cumulatives : le rôle doit avoir **toutes** les permissions listées.
- Si vous voulez un rôle ayant **l'une ou l'autre** permission, faites deux appels séparés.
- Pour le rôle le plus bas avec ces permissions, utilisez `$lowestRoleWithPerms[]`.
