---
layout: doc
title: $onlyForRoles
translation_key: docs
category: "Moderation"
function_name: onlyForRoles
syntax: $onlyForRoles[roleID1;roleID2;...;(errorMessage)]
description: Function guard qui stops l'exécution si the user ne possède no des roles spécifiés.
---

# $onlyForRoles

The function guard `$onlyForRoles` vérifie que the user possède **au moins un** des roles Discord spécifiés. Si the user n'a no de ces roles, the command est interrompue.

## Syntax

```
$onlyForRoles[roleID1;roleID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `roleID1;roleID2;...` | Snowflake[] | IDs des roles alloweds, separateds par `;`. |
| `errorMessage` | String (optional) | Message sent si the user n'a no des roles. |

## Behavior

- Checks les roles of the user déclencheur.
- La vérification est de type **OU** : the user n'a besoin que d'a single role parmi ceux listés.
- Si the user a au moins un role de la list, the command continue.
- Si the user n'a **no** des roles listés, the command est interrompue.

## Examples

### Command réservée aux modérateurs

```bdfd
$onlyForRoles[123456789012345678;❌ Seuls les modérateurs peuvent utiliser cette command.]
$mute[$mentioned[1];Reason]
$sendMessage[$mentioned[1] was mute.]
```

### Plusieurs roles alloweds (Modo or Admin)

```bdfd
$onlyForRoles[111111111111111111;222222222222222222;❌ Permissions insuffisantes.]
$clear[100]
```

### Command staff avec message de redirection

```bdfd
$onlyForRoles[123456789012345678;❌ Command réservée au staff. Faites un ticket pour toute demande.]
$sendMessage[Bienvenue in the panneau staff.]
```

## Notes

- La vérification est **OU** (a single role suffit), contrairement à `$onlyPerms` qui fait un **ET** sur les permissions.
- Pour vérifier par nom de role dynamicment, utilisez `$hasRole[$authorID;Name of the Role]`.
- `$onlyForRoleIDs` est un alias de `$onlyForRoles`.
- Pour blacklistr des roles, utilisez `$blacklistRoles` or `$blacklistRoleIDs`.
- Combinez avec `$onlyForChannels` pour restreindre à la fois par role and par channel.
