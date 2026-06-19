---
layout: doc
title: $blacklistIDs
translation_key: docs
category: "Moderation"
function_name: blacklistIDs
syntax: $blacklistIDs[userID1;userID2;...;(errorMessage)]
description: Fonction guard qui blackliste des utilisateurs par ID. Si l'utilisateur déclencheur est dans la liste, la commande est interrompue.
parameters:
  - name: userID1, userID2, ...
    description: Liste des IDs utilisateurs à blacklister.
  - name: errorMessage
    description: (Optionnel) Message envoyé aux utilisateurs blacklistés.
    optional: true
returns: []
related:
  - $blacklistUsers
  - $blacklistRoles
  - $blacklistServers
  - $onlyForIDs
  - $onlyForUsers
examples:
  - description: Bloquer un utilisateur spécifique
    code: |
      $blacklistIDs[123456789012345678;❌ Vous êtes blacklisté de cette commande.]
      $sendMessage[Commande exécutée.]
  - description: Bloquer plusieurs IDs
    code: |
      $blacklistIDs[111;222;333;❌ Accès refusé.]
      $sendMessage[OK.]
---

# $blacklistIDs

La fonction guard `$blacklistIDs` bloque l'exécution de la commande pour les utilisateurs dont l'ID figure dans la liste. Contrairement à `$onlyForIDs` qui whitelist, `$blacklistIDs` fait une **blacklist**.

## Syntaxe

```
$blacklistIDs[userID1;userID2;...;(errorMessage)]
```

## Paramètres

| Paramètre | Type | Description |
|-----------|------|-------------|
| `userID1;userID2;...` | Snowflake[] | IDs des utilisateurs à blacklister, séparés par `;`. |
| `errorMessage` | String (optionnel) | Message envoyé à l'utilisateur blacklisté. Si omis, silence. |

## Comportement

- Compare l'ID de l'utilisateur déclencheur avec la liste noire.
- Si l'ID correspond, la commande est interrompue.
- Si un message d'erreur est fourni, il est envoyé avant l'interruption.
- Sans message d'erreur, le guard est silencieux.

## Exemples

### Blacklist simple

```bdfd
$blacklistIDs[123456789012345678;❌ Vous avez été blacklisté de cette commande.]
$sendMessage[Traitement effectué.]
```

### Blacklist multiple avec liste externe

```bdfd
$blacklistIDs[$getGlobalUserVar[blacklist];❌ Accès révoqué.]
$sendMessage[Bienvenue.]
```

### Sans message (silencieux)

```bdfd
$blacklistIDs[111111111111111111;222222222222222222]
$sendMessage[OK.]
```

## Notes

- `$blacklistIDs` et `$blacklistUsers` sont interchangeables.
- Pour une blacklist persistante, combinez avec `$getGlobalUserVar` ou `$getServerUserVar`.
- Pour blacklister un rôle entier, utilisez `$blacklistRoles` ou `$blacklistRoleIDs`.
- L'inverse de cette fonction est `$onlyForIDs` (whitelist).
