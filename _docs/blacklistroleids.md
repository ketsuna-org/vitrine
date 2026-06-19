---
layout: doc
title: $blacklistRoleIDs
translation_key: docs
category: "Moderation"
function_name: blacklistRoleIDs
syntax: $blacklistRoleIDs[roleID1;roleID2;...;(errorMessage)]
description: Function guard qui blacklist of roles by ID. Alias de $blacklistRoles.
---

# $blacklistRoleIDs

The function guard `$blacklistRoleIDs` bloque l'execution of the command if the user possède l'un of roles blacklistés. This is un alias direct de `$blacklistRoles`.

## Syntax

```
$blacklistRoleIDs[roleID1;roleID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `roleID1;roleID2;...` | Snowflake[] | IDs of roles blacklistés. |
| `errorMessage` | String (optional) | Message if the user a a role blacklisté. |

## Behavior

- Checks les roles of the user.
- Vérification de type **OU** : a singthe role blacklisté suffit.
- Alias exact de `$blacklistRoles`.

## Examples

### Role Muted

```bdfd
$blacklistRoleIDs[123456789012345678;❌ Vous êtes mute.]
$sendMessage[Traitement OK.]
```

### Multi-roles

```bdfd
$blacklistRoleIDs[111;222;333;❌ Accès refusé.]
$sendMessage[OK.]
```

## Notes

- `$blacklistRoleIDs` and `$blacklistRoles` sont interchangeables.
- Pour whitelistr of roles, use `$onlyForRoleIDs`.
- For gros servers, stockez les IDs dans a variable (`$getServerVar`) for ae maintenance facilitée.
