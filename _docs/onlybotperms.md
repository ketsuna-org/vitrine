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

The function guard `$onlyBotPerms` vérifie que le **bot lui-même** possède all permissions Discord spécifiées on the server. Si the bot manque of une permission, the command est interrompue.

## Syntax

```
$onlyBotPerms[permission1;permission2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `permission1;permission2;...` | String[] | List permissions Discord separatedes par `;`. The bot doit posséder **all** ces permissions. |
| `errorMessage` | String (optional) | Message sent si the bot n'a pas les permissions requiredes. Si omitted, silence. |

## Behavior

- Checks les permissions globals of the bot on the server (pas only in the channel courant).
- La permission `Administrator` couvre implicitement all autres.
- Si the bot n'a pas les permissions, the command s'stops immédiatement.
- Différence with `$onlyPerms` : `$onlyPerms` vérifie l'**user**, `$onlyBotPerms` vérifie le **bot**.

## Examples

### Vérification before un ban

```bdfd
$onlyBotPerms[BanMembers;❌ Je n'ai pas la permission **BanMembers**. Contactez un admin.]
$ban[$mentioned[1]]
```

### Vérification multi-permissions

```bdfd
$onlyBotPerms[ManageMessages;ReadMessageHistory;❌ J'ai besoin of gérer les messages.]
$clear[50]
$sendMessage[Nettoyage terminé.]
```

### Command of création of role

```bdfd
$onlyBotPerms[ManageRoles;❌ Je ne peux pas create of roles without the permission **ManageRoles**.]
$createRole[New Role;#5865F2]
$sendMessage[Role created successfully.]
```

## Notes

- À use systématiquement before toute action nécessitant permissions specifics of the bot (ban, kick, gestion of roles, suppression of messages, etc.).
- Pour les permissions specifics to the **channel** (ex: `SendMessages`, `ViewChannel`), utilisez `$onlyBotChannelPerms`.
- Les noms of permissions sont en PascalCase (`ManageMessages`, `BanMembers`, etc.).
- Équivaslow to `$onlyIf[$hasPerms[$botID;Permission]==true]` mais plus concis.
