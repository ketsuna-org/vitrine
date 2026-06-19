---
layout: doc
title: $blacklistUsers
translation_key: docs
category: "Moderation"
function_name: blacklistUsers
syntax: $blacklistUsers[userID1;userID2;...;(errorMessage)]
description: Fonction guard qui blackliste des utilisateurs par ID. Alias de $blacklistIDs. La commande est interrompue si l'utilisateur est dans la liste.
---

# $blacklistUsers

La fonction guard `$blacklistUsers` bloque l'exécution de la commande pour les utilisateurs listés. C'est un alias direct de `$blacklistIDs`.

## Syntaxe

```
$blacklistUsers[userID1;userID2;...;(errorMessage)]
```

## Paramètres

| Paramètre | Type | Description |
|-----------|------|-------------|
| `userID1;userID2;...` | Snowflake[] | IDs des utilisateurs à blacklister. |
| `errorMessage` | String (optionnel) | Message envoyé à l'utilisateur blacklisté. |

## Comportement

- Si l'utilisateur est dans la liste, la commande est interrompue.
- Si un message d'erreur est fourni, il est envoyé avant l'interruption.
- Alias exact de `$blacklistIDs`.

## Exemples

### Blacklist avec message

```bdfd
$blacklistUsers[111111111111111111;222222222222222222;❌ Vous êtes blacklisté.]
$sendMessage[Accès autorisé.]
```

### Blacklist silencieuse

```bdfd
$blacklistUsers[123456789012345678]
$sendMessage[OK.]
```

## Notes

- `$blacklistUsers` et `$blacklistIDs` sont interchangeables.
- Pour blacklister des rôles, utilisez `$blacklistRoles`.
- Pour whitelister (autoriser uniquement certains utilisateurs), utilisez `$onlyForUsers`.
