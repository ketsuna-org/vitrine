---
layout: doc
title: $blacklistServers
translation_key: docs
category: "Moderation"
function_name: blacklistServers
syntax: $blacklistServers[guildID1;guildID2;...;(errorMessage)]
description: Fonction guard qui blackliste des serveurs. Si la commande est exécutée dans un serveur blacklisté, elle est interrompue.
---

# $blacklistServers

La fonction guard `$blacklistServers` bloque l'exécution de la commande dans les serveurs listés. Si la commande est exécutée dans un serveur blacklisté, elle est interrompue.

## Syntaxe

```
$blacklistServers[guildID1;guildID2;...;(errorMessage)]
```

## Paramètres

| Paramètre | Type | Description |
|-----------|------|-------------|
| `guildID1;guildID2;...` | Snowflake[] | IDs des serveurs à blacklister. |
| `errorMessage` | String (optionnel) | Message si le serveur est blacklisté. |

## Comportement

- Compare l'ID du serveur courant (`$guildID`/`$serverID`) avec la liste.
- Si le serveur est dans la liste, la commande est interrompue.
- Si un message d'erreur est fourni, il est envoyé ; sinon, silence.

## Exemples

### Bloquer un serveur

```bdfd
$blacklistServers[123456789012345678;❌ Commande désactivée sur ce serveur.]
$sendMessage[Commande exécutée.]
```

### Blacklist multi-serveurs

```bdfd
$blacklistServers[111111111111111111;222222222222222222]
$sendMessage[OK.]
```

### Blacklist dynamique via variable

```bdfd
$blacklistServers[$getGlobalVar[blacklistedServers];❌ Serveur blacklisté.]
$sendMessage[Bienvenue.]
```

## Notes

- Pour whitelister des serveurs (autoriser uniquement certains serveurs), utilisez `$onlyForServers`.
- La blacklist de serveur est utile pour les bots publics afin de désactiver des commandes sur des serveurs problématiques.
- Combinez avec des variables globales pour gérer la blacklist dynamiquement sans modifier le code.
