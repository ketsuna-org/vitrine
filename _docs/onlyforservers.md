---
layout: doc
title: $onlyForServers
translation_key: docs
category: "Moderation"
function_name: onlyForServers
syntax: $onlyForServers[guildID1;guildID2;...;(errorMessage)]
description: Fonction guard qui arrête l'exécution si la commande n'est pas utilisée dans l'un des serveurs spécifiés. Accepte également l'alias $onlyForGuilds.
parameters:
  - name: guildID1, guildID2, ...
    description: Liste des IDs de serveurs autorisés.
  - name: errorMessage
    description: (Optionnel) Message d'erreur.
    optional: true
returns: []
related:
  - $onlyForChannels
  - $onlyForCategories
  - $serverID
  - $blacklistServers
examples:
  - description: Restreindre une commande à un serveur spécifique
    code: |
      $onlyForServers[123456789012345678;❌ Cette commande n'est pas disponible sur ce serveur.]
      $sendMessage[Commande exécutée.]
---

# $onlyForServers

La fonction guard `$onlyForServers` limite l'exécution d'une commande à un ou plusieurs serveurs Discord spécifiques. Si la commande est utilisée sur un autre serveur, elle est interrompue.

## Syntaxe

```
$onlyForServers[guildID1;guildID2;...;(errorMessage)]
```

## Paramètres

| Paramètre | Type | Description |
|-----------|------|-------------|
| `guildID1;guildID2;...` | Snowflake[] | IDs des serveurs autorisés. |
| `errorMessage` | String (optionnel) | Message envoyé si le serveur n'est pas autorisé. |

## Comportement

- Compare l'ID du serveur courant (`$guildID` / `$serverID`) avec la liste.
- Si le serveur est dans la liste, la commande continue.
- Si le serveur n'est **pas** dans la liste, la commande est interrompue.
- Alias : `$onlyForGuilds` (les deux syntaxes sont équivalentes).

## Exemples

### Serveur unique

```bdfd
$onlyForServers[123456789012345678;❌ Cette commande est exclusive à notre serveur principal.]
$sendMessage[Bienvenue !]
```

### Plusieurs serveurs

```bdfd
$onlyForServers[111111111111111111;222222222222222222;❌ Commande non disponible ici.]
$restart
```

### Sans message d'erreur

```bdfd
$onlyForServers[123456789012345678]
$sendMessage[Fonctionnalité serveur privé activée.]
```

## Notes

- `$onlyForServers` et `$onlyForGuilds` sont interchangeables. Utilisez la syntaxe la plus claire pour votre équipe.
- Très utile pour les bots privés ou les fonctionnalités exclusives à un serveur partenaire.
- Pour blacklister des serveurs, utilisez `$blacklistServers`.
- Combinez avec `$onlyForChannels` pour un contrôle fin (serveur + salon).
