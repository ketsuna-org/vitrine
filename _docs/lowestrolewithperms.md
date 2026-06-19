---
layout: doc
title: $lowestRoleWithPerms
translation_key: docs
category: "Entity Info"
function_name: lowestRoleWithPerms
syntax: $lowestRoleWithPerms[permission1;permission2;...]
description: Retourne l'ID du rôle le plus bas de l'utilisateur qui possède les permissions spécifiées.
parameters:
  - name: permissions
    description: Liste des permissions requises, séparées par des points-virgules.
returns:
  - type: snowflake (string)
    description: L'ID du rôle le plus bas possédant les permissions spécifiées, ou chaîne vide si aucun rôle ne correspond.
related:
  - $highestRoleWithPerms
  - $lowestRole
  - $userPerms
  - $memberPerms
examples:
  - description: Rôle le plus bas avec permission ManageMessages
    code: $lowestRoleWithPerms[ManageMessages]
  - description: Rôle avec permissions vocales
    code: $lowestRoleWithPerms[Connect;Speak]
  - description: Vérifier un rôle avec permissions
    code: |
      $if[$lowestRoleWithPerms[BanMembers]!=]
        $sendMessage[Tous vos rôles de modération peuvent bannir.]
      $endif
---

# $lowestRoleWithPerms

La fonction `$lowestRoleWithPerms[]` retourne l'**ID du rôle le plus bas** de l'utilisateur qui possède une ou plusieurs permissions spécifiques.

## Syntaxe

```
$lowestRoleWithPerms[permission1;permission2;...]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `permissions` | Une ou plusieurs permissions Discord, séparées par des points-virgules. Toutes les permissions listées doivent être présentes sur le rôle. |

## Valeur de retour

- **Type** : Snowflake (chaîne numérique) ou chaîne vide
- L'ID du rôle le plus bas possédant toutes les permissions demandées
- Chaîne vide si aucun rôle ne correspond

## Comportement

- Parcourt les rôles de l'utilisateur du plus bas au plus haut.
- Retourne le **premier** rôle (le plus bas) qui possède **toutes** les permissions spécifiées.
- Les noms de permissions sont en anglais (nomenclature API Discord).

## Exemples

### Trouver le rôle avec accès vocal le plus bas

```bdfd
$let[voiceRole;$lowestRoleWithPerms[Connect;Speak]]
$if[$voiceRole!=]
  $sendMessage[Votre rôle vocal le plus bas : $roleName[$voiceRole]]
$endif
```

### Vérifier les permissions de base

```bdfd
$let[basicRole;$lowestRoleWithPerms[SendMessages;ReadMessageHistory]]
$if[$basicRole!=]
  $sendMessage[Le rôle $roleName[$basicRole] vous donne accès aux messages.]
$endif
```

### Comparaison highest/lowest

```bdfd
$let[highest;$highestRoleWithPerms[ManageMessages]]
$let[lowest;$lowestRoleWithPerms[ManageMessages]]
$title[Permissions de modération]
$description[
**Rôle le plus haut :** $roleName[$highest]
**Rôle le plus bas :** $roleName[$lowest]
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Utile pour déterminer le niveau minimum auquel une permission est accordée.
- Si `$highestRoleWithPerms[]` et `$lowestRoleWithPerms[]` retournent le même ID, un seul rôle possède ces permissions.
- Idéal pour les systèmes de hiérarchie et de vérification de permissions granulaires.
