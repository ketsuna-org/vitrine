---
layout: doc
title: $onlyForChannels
translation_key: docs
category: "Moderation"
function_name: onlyForChannels
syntax: $onlyForChannels[channelID1;channelID2;...;(errorMessage)]
description: Fonction guard qui arrête l'exécution si la commande n'est pas exécutée dans l'un des channels spécifiés.
---

# $onlyForChannels

La fonction guard `$onlyForChannels` limite l'exécution d'une commande à un ou plusieurs channels Discord spécifiques. Si la commande est exécutée ailleurs, elle est interrompue.

## Syntaxe

```
$onlyForChannels[channelID1;channelID2;...;(errorMessage)]
```

## Paramètres

| Paramètre | Type | Description |
|-----------|------|-------------|
| `channelID1;channelID2;...` | Snowflake[] | IDs des channels autorisés, séparés par `;`. |
| `errorMessage` | String (optionnel) | Message envoyé si le channel n'est pas autorisé. |

## Comportement

- Compare l'ID du channel courant avec la liste fournie.
- Si le channel fait partie de la liste, la commande continue normalement.
- Si le channel n'est **pas** dans la liste, la commande est interrompue.
- Pratique pour créer des salons dédiés (ex: salon `#commandes`, `#bots`).

## Exemples

### Salon de commandes dédié

```bdfd
$onlyForChannels[123456789012345678;❌ Utilisez cette commande dans <#123456789012345678>.]
$sendMessage[Traitement en cours...]
```

### Plusieurs salons autorisés

```bdfd
$onlyForChannels[111111111111111111;222222222222222222;333333333333333333;❌ Salon non autorisé.]
$clear[50]
```

### Sans message d'erreur

```bdfd
$onlyForChannels[123456789012345678]
$ban[$mentioned[1]]
```

## Notes

- Utilisez le **Mode Développeur** Discord pour copier facilement les IDs de channels.
- `$onlyForChannels` fait une **whitelist** (autorise certains salons). Pour une **blacklist** (interdire certains salons), utilisez `$ignoreChannels`.
- Pour restreindre par catégorie entière, utilisez `$onlyForCategories`.
- Combinez avec `$onlyForServers` pour restreindre à certains serveurs + certains salons.
