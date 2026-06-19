---
layout: doc
title: $onlyPerms
translation_key: docs
category: "Moderation"
function_name: onlyPerms
syntax: $onlyPerms[permission1;permission2;...;(errorMessage)]
description: Fonction guard qui arrête l'exécution de la commande si l'utilisateur ne possède pas toutes les permissions spécifiées.
---

# $onlyPerms

La fonction guard `$onlyPerms` vérifie que l'utilisateur possède **toutes** les permissions Discord listées. Si une permission manque, la commande est interrompue.

## Syntaxe

```
$onlyPerms[permission1;permission2;...;(errorMessage)]
```

## Paramètres

| Paramètre | Type | Description |
|-----------|------|-------------|
| `permission1;permission2;...` | String[] | Liste des permissions Discord séparées par `;`. L'utilisateur doit posséder **toutes** ces permissions. |
| `errorMessage` | String (optionnel) | Message envoyé à l'utilisateur si les permissions sont insuffisantes. Si omis, le bot reste silencieux. |

**Permissions Discord courantes :** `Administrator`, `BanMembers`, `KickMembers`, `ManageMessages`, `ManageChannels`, `ManageRoles`, `ManageGuild`, `ModerateMembers`, `MuteMembers`, `DeafenMembers`, `MoveMembers`, `ManageNicknames`, `ManageWebhooks`, `ManageGuildExpressions`, `ViewAuditLog`, `ViewGuildInsights`.

## Comportement

- Vérifie les permissions de l'utilisateur **dans le serveur**, pas dans le channel.
- Si l'utilisateur a la permission `Administrator`, **toutes** les autres permissions sont implicitement accordées.
- La vérification est de type **ET** : toutes les permissions listées sont requises.

## Exemples

### Permission unique

```bdfd
$onlyPerms[BanMembers;❌ Permission de bannir requise.]
$ban[$mentioned[1];Raison fournie par le staff]
$sendMessage[$mentioned[1] a été banni.]
```

### Permissions multiples

```bdfd
$onlyPerms[ManageMessages;ManageChannels;❌ Vous avez besoin des perms Messages + Salons.]
$clear[50]
$sendMessage[50 messages supprimés.]
```

### Sans message d'erreur (silencieux)

```bdfd
$onlyPerms[KickMembers]
$kick[$mentioned[1]]
```

## Notes

- Les noms de permissions sont sensibles à la casse. Utilisez la notation PascalCase exacte de Discord (`BanMembers`, pas `banmembers`).
- Pour vérifier les permissions **du bot**, utilisez `$onlyBotPerms`.
- Pour une vérification inline (sans interrompre la commande), utilisez `$hasPerms`.
- Placez `$onlyPerms` en début de commande pour éviter toute exécution partielle.
