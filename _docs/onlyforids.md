---
layout: doc
title: $onlyForIDs
translation_key: docs
category: "Moderation"
function_name: onlyForIDs
syntax: $onlyForIDs[userID1;userID2;...;(errorMessage)]
description: Fonction guard qui arrête l'exécution si l'ID de l'utilisateur ne figure pas dans la liste des IDs autorisés. Alias de $onlyForUsers.
parameters:
  - name: userID1, userID2, ...
    description: Liste des IDs utilisateurs autorisés.
  - name: errorMessage
    description: (Optionnel) Message d'erreur.
    optional: true
returns: []
related:
  - $onlyForUsers
  - $onlyForRoles
  - $blacklistIDs
  - $authorID
examples:
  - description: Réserver aux développeurs du bot
    code: |
      $onlyForIDs[111111111111111111;222222222222222222;❌ Accès développeurs uniquement.]
      $sendMessage[Mode debug activé.]
---

# $onlyForIDs

La fonction guard `$onlyForIDs` restreint l'exécution d'une commande à une liste d'IDs utilisateurs. C'est un alias direct de `$onlyForUsers` — les deux fonctions sont interchangeables.

## Syntaxe

```
$onlyForIDs[userID1;userID2;...;(errorMessage)]
```

## Paramètres

| Paramètre | Type | Description |
|-----------|------|-------------|
| `userID1;userID2;...` | Snowflake[] | IDs Discord des utilisateurs autorisés. |
| `errorMessage` | String (optionnel) | Message envoyé aux utilisateurs non autorisés. |

## Comportement

- Compare l'ID de l'utilisateur déclencheur (`$authorID`) avec la liste.
- Si l'ID correspond, la commande continue.
- Si l'ID ne correspond pas, la commande est interrompue.
- Fonctionnellement identique à `$onlyForUsers`.

## Exemples

### Commande owner-only

```bdfd
$onlyForIDs[$botOwnerID;❌ Seul le propriétaire peut utiliser cette commande.]
$eval[$message]
```

### Plusieurs IDs autorisés

```bdfd
$onlyForIDs[111111111111111111;222222222222222222;333333333333333333]
$sendMessage[Accès autorisé.]
```

### Message d'erreur informatif

```bdfd
$onlyForIDs[123456789012345678;❌ Cette commande est en maintenance. Seul le développeur peut l'utiliser.]
```

## Notes

- `$onlyForIDs` et `$onlyForUsers` sont **strictement identiques**. Utilisez celui qui est le plus lisible dans votre contexte.
- Activez le **Mode Développeur** dans Discord (Paramètres → Avancé) pour copier les IDs.
- Pour une blacklist d'IDs, utilisez `$blacklistIDs`.
- Si vous voulez autoriser un rôle entier plutôt que des utilisateurs spécifiques, préférez `$onlyForRoles`.
