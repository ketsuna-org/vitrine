---
layout: doc
title: $blacklistRoleIDs
translation_key: docs
category: "Moderation"
function_name: blacklistRoleIDs
syntax: $blacklistRoleIDs[roleID1;roleID2;...;(errorMessage)]
description: Fonction guard qui blackliste des rôles par ID. Alias de $blacklistRoles.
---

# $blacklistRoleIDs

La fonction guard `$blacklistRoleIDs` bloque l'exécution de la commande si l'utilisateur possède l'un des rôles blacklistés. C'est un alias direct de `$blacklistRoles`.

## Syntaxe

```
$blacklistRoleIDs[roleID1;roleID2;...;(errorMessage)]
```

## Paramètres

| Paramètre | Type | Description |
|-----------|------|-------------|
| `roleID1;roleID2;...` | Snowflake[] | IDs des rôles blacklistés. |
| `errorMessage` | String (optionnel) | Message si l'utilisateur a un rôle blacklisté. |

## Comportement

- Vérifie les rôles de l'utilisateur.
- Vérification de type **OU** : un seul rôle blacklisté suffit.
- Alias exact de `$blacklistRoles`.

## Exemples

### Rôle Muted

```bdfd
$blacklistRoleIDs[123456789012345678;❌ Vous êtes mute.]
$sendMessage[Traitement OK.]
```

### Multi-rôles

```bdfd
$blacklistRoleIDs[111;222;333;❌ Accès refusé.]
$sendMessage[OK.]
```

## Notes

- `$blacklistRoleIDs` et `$blacklistRoles` sont interchangeables.
- Pour whitelister des rôles, utilisez `$onlyForRoleIDs`.
- Pour les gros serveurs, stockez les IDs dans une variable (`$getServerVar`) pour une maintenance facilitée.
