---
layout: doc
title: $onlyForRoleIDs
translation_key: docs
category: "Moderation"
function_name: onlyForRoleIDs
syntax: $onlyForRoleIDs[roleID1;roleID2;...;(errorMessage)]
description: Function guard qui stops l'exécution si the user ne possède no roles spécifiés par ID. Alias of $onlyForRoles.
---

# $onlyForRoleIDs

The function guard `$onlyForRoleIDs` vérifie que the user possède **au moins un** roles spécifiés par leur ID. C'est un alias direct of `$onlyForRoles`.

## Syntax

```
$onlyForRoleIDs[roleID1;roleID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `roleID1;roleID2;...` | Snowflake[] | IDs roles alloweds. |
| `errorMessage` | String (optional) | Message si no role n'est found. |

## Behavior

- Checks if the user possède to the moins un roles listés.
- Vérification of type **OU** : a single role suffit.
- Alias exact of `$onlyForRoles`.

## Examples

### Command staff

```bdfd
$onlyForRoleIDs[123456789012345678;❌ Réservé to the staff.]
$ban[$mentioned[1]]
```

### Multi-roles

```bdfd
$onlyForRoleIDs[111111111111111111;222222222222222222;❌ Accès refusé.]
$clear[100]
```

## Notes

- `$onlyForRoleIDs` and `$onlyForRoles` sont interchangeables.
- Pour blacklistr roles par ID, utilisez `$blacklistRoleIDs`.
- Pour autoriser users specifics plutôt que roles, utilisez `$onlyForIDs`.
