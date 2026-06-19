---
layout: doc
title: $onlyForUsers
translation_key: docs
category: "Moderation"
function_name: onlyForUsers
syntax: $onlyForUsers[userID1;userID2;...;(errorMessage)]
description: Fonction guard qui arrête l'exécution si l'utilisateur ne fait pas partie de la liste d'IDs autorisés.
parameters:
  - name: userID1, userID2, ...
    description: Liste des IDs Discord des utilisateurs autorisés à exécuter la commande.
  - name: errorMessage
    description: (Optionnel) Message d'erreur envoyé aux utilisateurs non autorisés.
    optional: true
returns: []
related:
  - $onlyForIDs
  - $onlyForRoles
  - $onlyForChannels
  - $onlyAdmin
examples:
  - description: Réserver une commande à deux utilisateurs spécifiques
    code: |
      $onlyForUsers[123456789012345678;987654321098765432;❌ Commande réservée.]
      $sendMessage[Accès autorisé.]
  - description: Commande owner-only
    code: |
      $onlyForUsers[$botOwnerID;❌ Seul le propriétaire du bot peut utiliser cette commande.]
      $eval[$message]
---

# $onlyForUsers

La fonction guard `$onlyForUsers` restreint l'exécution d'une commande à une liste spécifique d'utilisateurs, identifiés par leur ID Discord. Si l'utilisateur qui déclenche la commande n'est pas dans la liste, la commande est interrompue.

## Syntaxe

```
$onlyForUsers[userID1;userID2;...;(errorMessage)]
```

## Paramètres

| Paramètre | Type | Description |
|-----------|------|-------------|
| `userID1;userID2;...` | Snowflake[] | Liste des IDs Discord des utilisateurs autorisés. Séparateur `;`. |
| `errorMessage` | String (optionnel) | Message envoyé aux utilisateurs non autorisés. |

## Comportement

- Compare l'ID de l'utilisateur déclencheur avec la liste fournie.
- Si l'ID correspond à l'un des IDs de la liste, la commande continue.
- Si l'ID ne correspond à **aucun** ID de la liste, la commande est interrompue.
- Le message d'erreur, s'il est fourni, est envoyé avant l'interruption.

## Exemples

### Commande owner-only

```bdfd
$onlyForUsers[$botOwnerID;❌ Commande réservée au propriétaire du bot.]
$restart
```

### Plusieurs utilisateurs de confiance

```bdfd
$onlyForUsers[111111111111111111;222222222222222222;333333333333333333;❌ Accès refusé.]
$sendMessage[Bienvenue dans le panneau de contrôle.]
```

### Sans message d'erreur

```bdfd
$onlyForUsers[123456789012345678]
$eval[$message]
```

## Notes

- Les IDs Discord sont des nombres de 17 à 19 chiffres (snowflakes). Activez le **Mode Développeur** dans Discord pour les obtenir (clic droit → Copier l'ID).
- `$onlyForUsers` vérifie l'ID utilisateur, pas le nom ni le tag. Utilisez `$onlyForRoles` pour une vérification par rôle.
- `$onlyForIDs` est un alias de `$onlyForUsers` — les deux fonctions sont interchangeables.
- Pour blacklister des utilisateurs au lieu de les whitelister, utilisez `$blacklistUsers` ou `$blacklistIDs`.
