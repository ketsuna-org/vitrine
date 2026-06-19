---
layout: doc
title: $onlyBotPerms
translation_key: docs
category: "Moderation"
function_name: onlyBotPerms
syntax: $onlyBotPerms[permission1;permission2;...;(errorMessage)]
description: Function guard qui stops l'exécution si the bot ne possède pas all permissions spécifiées on the server.
---

# $onlyBotPerms

The function guard `$onlyBotPerms` vérifie que le **bot lui-même** possède all permissions Discord spécifiées on the server. Si the bot manque d'une permission, the command est interrompue.

## Syntax

```
$onlyBotPerms[permission1;permission2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `permission1;permission2;...` | String[] | List des permissions Discord separatedes par `;`. The bot doit posséder **all** ces permissions. |
| `errorMessage` | String (optional) | Message sent si the bot n'a pas les permissions requiredes. Si omis, silence. |

## Behavior

- Checks les permissions globals of the bot on the server (pas only in the channel courant).
- La permission `Administrator` couvre implicitement all autres.
- Si the bot n'a pas les permissions, the command s'stops immédiatement.
- Différence avec `$onlyPerms` : `$onlyPerms` vérifie l'**user**, `$onlyBotPerms` vérifie le **bot**.

## Examples

### Vérification before un ban

```bdfd
$onlyBotPerms[BanMembers;❌ Je n'ai pas la permission **BanMembers**. Contactez un admin.]
$ban[$mentioned[1]]
```

### Vérification multi-permissions

```bdfd
$onlyBotPerms[ManageMessages;ReadMessageHistory;❌ J'ai besoin de gérer les messages.]
$clear[50]
$sendMessage[Nettoyage terminé.]
```

### Command de création de role

```bdfd
$onlyBotPerms[ManageRoles;❌ Je ne peux pas créer de roles without the permission **ManageRoles**.]
$createRole[New Role;#5865F2]
$sendMessage[Role created successfully.]
```

## Notes

- À utiliser systématiquement before toute action nécessitant des permissions spécifiques of the bot (ban, kick, gestion de roles, suppression de messages, etc.).
- Pour les permissions spécifiques au **channel** (ex: `SendMessages`, `ViewChannel`), utilisez `$onlyBotChannelPerms`.
- Les noms de permissions sont en PascalCase (`ManageMessages`, `BanMembers`, etc.).
- Équivaslow à `$onlyIf[$hasPerms[$botID;Permission]==true]` mais plus concis.
