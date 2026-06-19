---
layout: doc
title: $onlyBotPerms
translation_key: docs
category: "Moderation"
function_name: onlyBotPerms
syntax: $onlyBotPerms[permission1;permission2;...;(errorMessage)]
description: Fonction guard qui arrête l'exécution si le bot ne possède pas toutes les permissions spécifiées sur le serveur.
parameters:
  - name: permission1, permission2, ...
    description: Liste des permissions Discord que le bot doit posséder.
  - name: errorMessage
    description: (Optionnel) Message d'erreur envoyé si le bot manque de permissions.
    optional: true
returns: []
related:
  - $onlyPerms
  - $onlyBotChannelPerms
  - $hasPerms
  - $checkUserPerms
examples:
  - description: Vérifier que le bot peut bannir
    code: |
      $onlyBotPerms[BanMembers;❌ Je n'ai pas la permission de bannir.]
      $ban[$mentioned[1]]
  - description: Vérifier plusieurs permissions du bot
    code: |
      $onlyBotPerms[ManageMessages;ManageChannels;❌ Permissions insuffisantes.]
      $clear[100]
---

# $onlyBotPerms

La fonction guard `$onlyBotPerms` vérifie que le **bot lui-même** possède toutes les permissions Discord spécifiées sur le serveur. Si le bot manque d'une permission, la commande est interrompue.

## Syntaxe

```
$onlyBotPerms[permission1;permission2;...;(errorMessage)]
```

## Paramètres

| Paramètre | Type | Description |
|-----------|------|-------------|
| `permission1;permission2;...` | String[] | Liste des permissions Discord séparées par `;`. Le bot doit posséder **toutes** ces permissions. |
| `errorMessage` | String (optionnel) | Message envoyé si le bot n'a pas les permissions requises. Si omis, silence. |

## Comportement

- Vérifie les permissions globales du bot sur le serveur (pas seulement dans le channel courant).
- La permission `Administrator` couvre implicitement toutes les autres.
- Si le bot n'a pas les permissions, la commande s'arrête immédiatement.
- Différence avec `$onlyPerms` : `$onlyPerms` vérifie l'**utilisateur**, `$onlyBotPerms` vérifie le **bot**.

## Exemples

### Vérification avant un ban

```bdfd
$onlyBotPerms[BanMembers;❌ Je n'ai pas la permission **BanMembers**. Contactez un admin.]
$ban[$mentioned[1]]
```

### Vérification multi-permissions

```bdfd
$onlyBotPerms[ManageMessages;ReadMessageHistory;❌ J'ai besoin de gérer les messages.]
$clear[50]
$sendMessage[Nettoyage terminé.]
```

### Commande de création de rôle

```bdfd
$onlyBotPerms[ManageRoles;❌ Je ne peux pas créer de rôles sans la permission **ManageRoles**.]
$createRole[Nouveau Rôle;#5865F2]
$sendMessage[Rôle créé avec succès.]
```

## Notes

- À utiliser systématiquement avant toute action nécessitant des permissions spécifiques du bot (ban, kick, gestion de rôles, suppression de messages, etc.).
- Pour les permissions spécifiques au **channel** (ex: `SendMessages`, `ViewChannel`), utilisez `$onlyBotChannelPerms`.
- Les noms de permissions sont en PascalCase (`ManageMessages`, `BanMembers`, etc.).
- Équivalent à `$onlyIf[$hasPerms[$botID;Permission]==true]` mais plus concis.
