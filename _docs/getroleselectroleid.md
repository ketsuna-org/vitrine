---
layout: doc
title: $getRoleSelectRoleID
translation_key: docs
category: "Entity Info"
function_name: getRoleSelectRoleID
syntax: $getRoleSelectRoleID[(index)]
description: Récupère l'ID du rôle sélectionné par l'utilisateur via un menu de sélection de rôles (role select).
---

# $getRoleSelectRoleID

La fonction `$getRoleSelectRoleID[]` permet de **récupérer l'ID du rôle** choisi par l'utilisateur dans un menu de sélection de rôles.

## Syntaxe

```
$getRoleSelectRoleID[(index)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `index` | Optionnel - L'index du rôle sélectionné (1 = premier). Par défaut 1. |

## Valeur de retour

- **Type** : String (Snowflake ID)
- L'ID Discord du rôle sélectionné.
- Chaîne vide si aucun rôle n'a été sélectionné.

## Comportement

- Utilisé dans les interactions de type `$onInteraction[]` avec un menu de sélection de rôles.
- Le menu de rôles est créé avec `$addRoleSelectMenu[]`.
- Fonctionne avec la sélection simple ou multiple (pour multiple, utiliser `$getRoleSelectRoleIDs[]`).

## Exemples

### Attribution de rôle via sélection

```bdfd
$nominalTrigger
$addRoleSelectMenu[role_select;1;Choisissez votre rôle]
$sendMessage[Sélectionnez un rôle :]

$onInteraction[role_select]
$let[roleID;$getRoleSelectRoleID]
$giveRole[$authorID;$roleID]
$title[Rôle attribué]
$description[Vous avez reçu le rôle **$roleName[$roleID]** !]
$color[#57F287]
$sendMessage[]
```

### Récupération avec index

```bdfd
$onInteraction[role_select]
$let[first;$getRoleSelectRoleID[1]]
$let[second;$getRoleSelectRoleID[2]]
$title[Rôles sélectionnés]
$description[
**Rôle 1 :** $roleName[$first]
**Rôle 2 :** $roleName[$second]
]
$sendMessage[]
```

## Notes

- L'index commence à 1.
- Pour récupérer tous les rôles d'une sélection multiple, utiliser `$getRoleSelectRoleIDs[]`.
- L'ID retourné est utilisable avec toutes les fonctions manipulant des rôles.
