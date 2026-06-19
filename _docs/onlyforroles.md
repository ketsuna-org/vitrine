---
layout: doc
title: $onlyForRoles
translation_key: docs
category: "Moderation"
function_name: onlyForRoles
syntax: $onlyForRoles[roleID1;roleID2;...;(errorMessage)]
description: Fonction guard qui arrête l'exécution si l'utilisateur ne possède aucun des rôles spécifiés.
parameters:
  - name: roleID1, roleID2, ...
    description: Liste des IDs de rôles autorisés.
  - name: errorMessage
    description: (Optionnel) Message d'erreur.
    optional: true
returns: []
related:
  - $onlyForRoleIDs
  - $onlyForUsers
  - $hasRole
  - $onlyForIDs
examples:
  - description: Réserver une commande au rôle Modérateur
    code: |
      $onlyForRoles[123456789012345678;❌ Réservé aux modérateurs.]
      $kick[$mentioned[1]]
  - description: Permettre à plusieurs rôles
    code: |
      $onlyForRoles[111;222;333;❌ Accès refusé.]
      $sendMessage[Panneau de modération.]
---

# $onlyForRoles

La fonction guard `$onlyForRoles` vérifie que l'utilisateur possède **au moins un** des rôles Discord spécifiés. Si l'utilisateur n'a aucun de ces rôles, la commande est interrompue.

## Syntaxe

```
$onlyForRoles[roleID1;roleID2;...;(errorMessage)]
```

## Paramètres

| Paramètre | Type | Description |
|-----------|------|-------------|
| `roleID1;roleID2;...` | Snowflake[] | IDs des rôles autorisés, séparés par `;`. |
| `errorMessage` | String (optionnel) | Message envoyé si l'utilisateur n'a aucun des rôles. |

## Comportement

- Vérifie les rôles de l'utilisateur déclencheur.
- La vérification est de type **OU** : l'utilisateur n'a besoin que d'un seul rôle parmi ceux listés.
- Si l'utilisateur a au moins un rôle de la liste, la commande continue.
- Si l'utilisateur n'a **aucun** des rôles listés, la commande est interrompue.

## Exemples

### Commande réservée aux modérateurs

```bdfd
$onlyForRoles[123456789012345678;❌ Seuls les modérateurs peuvent utiliser cette commande.]
$mute[$mentioned[1];Raison]
$sendMessage[$mentioned[1] a été mute.]
```

### Plusieurs rôles autorisés (Modo ou Admin)

```bdfd
$onlyForRoles[111111111111111111;222222222222222222;❌ Permissions insuffisantes.]
$clear[100]
```

### Commande staff avec message de redirection

```bdfd
$onlyForRoles[123456789012345678;❌ Commande réservée au staff. Faites un ticket pour toute demande.]
$sendMessage[Bienvenue dans le panneau staff.]
```

## Notes

- La vérification est **OU** (un seul rôle suffit), contrairement à `$onlyPerms` qui fait un **ET** sur les permissions.
- Pour vérifier par nom de rôle dynamiquement, utilisez `$hasRole[$authorID;Nom du Rôle]`.
- `$onlyForRoleIDs` est un alias de `$onlyForRoles`.
- Pour blacklister des rôles, utilisez `$blacklistRoles` ou `$blacklistRoleIDs`.
- Combinez avec `$onlyForChannels` pour restreindre à la fois par rôle et par salon.
