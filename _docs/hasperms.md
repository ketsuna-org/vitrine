---
layout: doc
title: $hasPerms
translation_key: docs
category: "Moderation"
function_name: hasPerms
syntax: $hasPerms[userID;permission1;permission2;...]
description: Vérifie si un utilisateur possède toutes les permissions spécifiées. Retourne "true" ou "false". Vérification inline, n'interrompt pas la commande.
---

# $hasPerms

La fonction `$hasPerms` est une **vérification inline** de permissions. Contrairement aux guards (`$onlyPerms`, `$onlyBotPerms`), elle n'interrompt pas la commande mais retourne `"true"` ou `"false"`, permettant une gestion conditionnelle fine.

## Syntaxe

```
$hasPerms[userID;permission1;permission2;...]
```

## Paramètres

| Paramètre | Type | Description |
|-----------|------|-------------|
| `userID` | Snowflake | L'ID de l'utilisateur dont on veut vérifier les permissions. |
| `permission1;permission2;...` | String[] | Liste des permissions à vérifier. **Toutes** les permissions doivent être présentes. |

## Valeur de retour

- **Type** : Chaîne `"true"` ou `"false"`
- `"true"` : l'utilisateur possède **toutes** les permissions listées
- `"false"` : il manque au moins une permission

## Comportement

- Vérifie les permissions globales de l'utilisateur sur le serveur.
- La vérification est de type **ET** : toutes les permissions listées sont requises.
- La permission `Administrator` satisfait implicitement toutes les autres.
- **N'interrompt pas** la commande (contrairement à `$onlyPerms`).

## Exemples

### Vérification conditionnelle simple

```bdfd
$if[$hasPerms[$authorID;BanMembers]==true]
  $ban[$mentioned[1];$noMentionMessage]
  $sendMessage[Membre banni.]
$else
  $sendMessage[❌ Vous n'avez pas la permission de bannir.]
$endif
```

### Multi-permissions

```bdfd
$if[$hasPerms[$authorID;ManageMessages;ManageChannels]==true]
  $clear[$message[1]]
  $sendMessage[$message[1] messages supprimés.]
$else
  $sendMessage[❌ Permissions insuffisantes.]
$endif
```

### Vérifier les permissions du bot

```bdfd
$if[$hasPerms[$botID;KickMembers]==false]
  $sendMessage[⚠️ Je n'ai pas la permission d'expulser. Veuillez vérifier mes permissions.]
  $stop
$endif
$kick[$mentioned[1]]
```

### Log conditionnel

```bdfd
$if[$hasPerms[$authorID;Administrator]==true]
  $log[Action admin : $userName a utilisé la commande.]
$endif
```

## Notes

- `$hasPerms` est une fonction **inline** : elle ne bloque pas la commande. Utilisez-la avec `$if` pour créer des comportements conditionnels.
- Pour le bot, utilisez `$botID` comme `userID`.
- Les noms de permissions sont en **PascalCase** (`BanMembers`, `KickMembers`, `ManageMessages`, etc.).
- Pour une vérification avec interruption automatique, utilisez `$onlyPerms` (utilisateur) ou `$onlyBotPerms` (bot).
- `$checkUserPerms` est un alias de `$hasPerms`.
