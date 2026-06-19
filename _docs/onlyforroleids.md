---
layout: doc
title: $onlyForRoleIDs
translation_key: docs
category: "Moderation"
function_name: onlyForRoleIDs
syntax: $onlyForRoleIDs[roleID1;roleID2;...;(errorMessage)]
description: Fonction guard qui arrête l'exécution si l'utilisateur ne possède aucun des rôles spécifiés par ID. Alias de $onlyForRoles.
---

# $onlyForRoleIDs

La fonction guard `$onlyForRoleIDs` vérifie que l'utilisateur possède **au moins un** des rôles spécifiés par leur ID. C'est un alias direct de `$onlyForRoles`.

## Syntaxe

```
$onlyForRoleIDs[roleID1;roleID2;...;(errorMessage)]
```

## Paramètres

| Paramètre | Type | Description |
|-----------|------|-------------|
| `roleID1;roleID2;...` | Snowflake[] | IDs des rôles autorisés. |
| `errorMessage` | String (optionnel) | Message si aucun rôle n'est trouvé. |

## Comportement

- Vérifie si l'utilisateur possède au moins un des rôles listés.
- Vérification de type **OU** : un seul rôle suffit.
- Alias exact de `$onlyForRoles`.

## Exemples

### Commande staff

```bdfd
$onlyForRoleIDs[123456789012345678;❌ Réservé au staff.]
$ban[$mentioned[1]]
```

### Multi-rôles

```bdfd
$onlyForRoleIDs[111111111111111111;222222222222222222;❌ Accès refusé.]
$clear[100]
```

## Notes

- `$onlyForRoleIDs` et `$onlyForRoles` sont interchangeables.
- Pour blacklister des rôles par ID, utilisez `$blacklistRoleIDs`.
- Pour autoriser des utilisateurs spécifiques plutôt que des rôles, utilisez `$onlyForIDs`.
