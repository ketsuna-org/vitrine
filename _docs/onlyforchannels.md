---
layout: doc
title: $onlyForChannels
translation_key: docs
category: "Moderation"
function_name: onlyForChannels
syntax: $onlyForChannels[channelID1;channelID2;...;(errorMessage)]
description: Function guard qui stops l'exécution si the command is not executed in the un des channels spécifiés.
---

# $onlyForChannels

The function guard `$onlyForChannels` limit l'exécution of a command à un or several channels Discord spécifiques. Si the command est executed ailleurs, it is interrompue.

## Syntax

```
$onlyForChannels[channelID1;channelID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `channelID1;channelID2;...` | Snowflake[] | IDs des channels alloweds, separateds par `;`. |
| `errorMessage` | String (optional) | Message sent if the channel is not allowed. |

## Behavior

- Compare the ID of the channel courant with the list fournie.
- Si le channel fait partie de la list, the command continue normalement.
- Si le channel n'est **pas** in the list, the command est interrompue.
- Pratique pour créer des channels dédiés (ex: channel `#commands`, `#bots`).

## Examples

### Channel de commands dédié

```bdfd
$onlyForChannels[123456789012345678;❌ Utilisez cette command dans <#123456789012345678>.]
$sendMessage[Traitement in progress...]
```

### Plusieurs channels alloweds

```bdfd
$onlyForChannels[111111111111111111;222222222222222222;333333333333333333;❌ Channel non allowed.]
$clear[50]
```

### Sans error message

```bdfd
$onlyForChannels[123456789012345678]
$ban[$mentioned[1]]
```

## Notes

- Utilisez le **Mode Développeur** Discord pour copier facilement les IDs de channels.
- `$onlyForChannels` fait une **whitelist** (autorise certains channels). Pour une **blacklist** (interdire certains channels), utilisez `$ignoreChannels`.
- Pour restreindre par catégorie entière, utilisez `$onlyForCategories`.
- Combinez avec `$onlyForServers` pour restreindre à certains servers + certains channels.
