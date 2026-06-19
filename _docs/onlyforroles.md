---
layout: doc
title: $onlyForRoles
translation_key: docs
category: "Moderation"
function_name: onlyForRoles
syntax: $onlyForRoles[roleID1;roleID2;...;(errorMessage)]
description: Function guard qui stops l'exécution si the user ne possède no roles spécifiés.
---

# $onlyForRoles

The function guard `$onlyForRoles` vérifie que the user possède **au moins un** roles Discord spécifiés. Si the user n'a no of ces roles, the command est interrompue.

## Syntax

```
$onlyForRoles[roleID1;roleID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `roleID1;roleID2;...` | Snowflake[] | IDs roles alloweds, separateds par `;`. |
| `errorMessage` | String (optional) | Message sent si the user n'a no roles. |

## Behavior

- Checks les roles of the user déclencheur.
- La vérification est of type **OU** : the user n'a besoin que of a single role parmi ceux listés.
- Si the user a to the moins un role of la list, the command continue.
- Si the user n'a **no** roles listés, the command est interrompue.

## Examples

### Command réservée to the modérateurs

```bdfd
$onlyForRoles[123456789012345678;❌ Seuls les modérateurs can use cette command.]
$mute[$mentioned[1];Reason]
$sendMessage[$mentioned[1] was mute.]
```

### Plusieurs roles alloweds (Modo or Admin)

```bdfd
$onlyForRoles[111111111111111111;222222222222222222;❌ Permissions insuffisantes.]
$clear[100]
```

### Command staff with message of redirection

```bdfd
$onlyForRoles[123456789012345678;❌ Command réservée to the staff. Faites un ticket pour toute demande.]
$sendMessage[Bienvenue in the panneau staff.]
```

## Notes

- La vérification est **OU** (a single role suffit), contrairement to `$onlyPerms` qui fait un **ET** on the permissions.
- Pour check par nom of role dynamicment, utilisez `$hasRole[$authorID;Name of the Role]`.
- `$onlyForRoleIDs` est un alias of `$onlyForRoles`.
- Pour blacklistr roles, utilisez `$blacklistRoles` or `$blacklistRoleIDs`.
- Combinez with `$onlyForChannels` pour restrict to la fois par role and par channel.
