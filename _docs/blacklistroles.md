---
layout: doc
title: $blacklistRoles
translation_key: docs
category: "Moderation"
function_name: blacklistRoles
syntax: $blacklistRoles[roleID1;roleID2;...;(errorMessage)]
description: Fonction guard qui blackliste des rôles. Si l'utilisateur possède l'un des rôles, la commande est interrompue.
parameters:
  - name: roleID1, roleID2, ...
    description: Liste des IDs de rôles à blacklister.
  - name: errorMessage
    description: (Optionnel) Message d'erreur.
    optional: true
returns: []
related:
  - $blacklistRoleIDs
  - $blacklistUsers
  - $onlyForRoles
  - $hasRole
examples:
  - description: Blacklister le rôle Muted
    code: |
      $blacklistRoles[123456789012345678;❌ Vous êtes mute. Vous ne pouvez pas utiliser cette commande.]
      $sendMessage[OK.]
---

# $blacklistRoles

La fonction guard `$blacklistRoles` bloque l'exécution de la commande si l'utilisateur possède **au moins un** des rôles blacklistés.

## Syntaxe

```
$blacklistRoles[roleID1;roleID2;...;(errorMessage)]
```

## Paramètres

| Paramètre | Type | Description |
|-----------|------|-------------|
| `roleID1;roleID2;...` | Snowflake[] | IDs des rôles à blacklister, séparés par `;`. |
| `errorMessage` | String (optionnel) | Message envoyé si l'utilisateur a un rôle blacklisté. |

## Comportement

- Vérifie si l'utilisateur possède un des rôles de la liste.
- Si **au moins un** rôle correspond, la commande est interrompue.
- Vérification de type **OU** (un seul rôle blacklisté suffit à bloquer).
- Si un message d'erreur est fourni, il est envoyé ; sinon, silence.

## Exemples

### Bloquer les utilisateurs mutés

```bdfd
$blacklistRoles[123456789012345678;❌ Vous êtes actuellement mute. Contactez un modérateur.]
$sendMessage[Votre message a été traité.]
```

### Multi-rôles blacklistés

```bdfd
$blacklistRoles[111111111111111111;222222222222222222;❌ Accès interdit pour votre rôle.]
$clear[10]
$sendMessage[10 messages supprimés.]
```

### Blacklist silencieuse

```bdfd
$blacklistRoles[123456789012345678]
$sendMessage[Commande exécutée.]
```

## Notes

- `$blacklistRoles` et `$blacklistRoleIDs` sont interchangeables.
- Pour whitelister des rôles, utilisez `$onlyForRoles`.
- Très utile pour empêcher les utilisateurs mutés ou en restriction d'utiliser des commandes.
- Combinez avec `$blacklistUsers` pour une protection complète (rôles + utilisateurs spécifiques).
