---
layout: doc
title: $onlyForRoleIDs
translation_key: docs
category: "Moderation"
function_name: onlyForRoleIDs
syntax: $onlyForRoleIDs[roleID1;roleID2;...;(errorMessage)]
description: Function guard qui stops l'exécution si the user ne possède no des roles spécifiés par ID. Alias de $onlyForRoles.
---

# $onlyForRoleIDs

The function guard `$onlyForRoleIDs` vérifie que the user possède **au moins un** des roles spécifiés par leur ID. C'est un alias direct de `$onlyForRoles`.

## Syntax

```
$onlyForRoleIDs[roleID1;roleID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `roleID1;roleID2;...` | Snowflake[] | IDs des roles alloweds. |
| `errorMessage` | String (optional) | Message si no role n'est found. |

## Behavior

- Checks if the user possède au moins un des roles listés.
- Vérification de type **OU** : a single role suffit.
- Alias exact de `$onlyForRoles`.

## Examples

### Command staff

```bdfd
$onlyForRoleIDs[123456789012345678;❌ Réservé au staff.]
$ban[$mentioned[1]]
```

### Multi-roles

```bdfd
$onlyForRoleIDs[111111111111111111;222222222222222222;❌ Accès refusé.]
$clear[100]
```

## Notes

- `$onlyForRoleIDs` and `$onlyForRoles` sont interchangeables.
- Pour blacklistr des roles par ID, utilisez `$blacklistRoleIDs`.
- Pour autoriser des users spécifiques plutôt que des roles, utilisez `$onlyForIDs`.
