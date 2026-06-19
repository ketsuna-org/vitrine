---
layout: doc
title: $checkUserPerms
translation_key: docs
category: "Moderation"
function_name: checkUserPerms
syntax: $checkUserPerms[userID;permission1;permission2;...]
description: Vérifie si un utilisateur possède toutes les permissions spécifiées. Alias de $hasPerms. Retourne "true" ou "false".
---

# $checkUserPerms

La fonction `$checkUserPerms` vérifie si un utilisateur possède toutes les permissions Discord spécifiées. C'est un **alias direct** de `$hasPerms` — les deux fonctions sont strictement identiques.

## Syntaxe

```
$checkUserPerms[userID;permission1;permission2;...]
```

## Paramètres

| Paramètre | Type | Description |
|-----------|------|-------------|
| `userID` | Snowflake | L'ID de l'utilisateur à vérifier. |
| `permission1;permission2;...` | String[] | Permissions requises (vérification **ET**). |

## Valeur de retour

- **Type** : Chaîne `"true"` ou `"false"`
- `"true"` : l'utilisateur possède toutes les permissions
- `"false"` : au moins une permission manque

## Comportement

- Vérification **inline** : n'interrompt pas la commande.
- Vérification de type **ET** : toutes les permissions listées sont nécessaires.
- `Administrator` couvre toutes les permissions.

## Exemples

### Vérification inline

```bdfd
$if[$checkUserPerms[$authorID;KickMembers]==true]
  $kick[$mentioned[1]]
$else
  $sendMessage[❌ Permission KickMembers requise.]
$endif
```

### Vérification des permissions d'un autre utilisateur

```bdfd
$if[$checkUserPerms[$mentioned[1];Administrator]==true]
  $sendMessage[⚠️ Vous ne pouvez pas agir sur un administrateur.]
  $stop
$endif
$ban[$mentioned[1]]
```

### Multi-permissions

```bdfd
$if[$checkUserPerms[$authorID;ManageMessages;ReadMessageHistory]==true]
  $clear[50]
$else
  $sendMessage[❌ Permissions insuffisantes.]
$endif
```

## Notes

- `$checkUserPerms` et `$hasPerms` sont **interchangeables**. Utilisez la syntaxe la plus explicite pour votre contexte.
- Pour le bot, passez `$botID` comme `userID`.
- Pour une vérification avec interruption automatique (guard), utilisez `$onlyPerms`.
- Les permissions sont en **PascalCase** : `BanMembers`, `ManageMessages`, `Administrator`, etc.
