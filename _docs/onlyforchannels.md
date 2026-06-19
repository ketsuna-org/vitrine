---
layout: doc
title: $onlyForChannels
translation_key: docs
category: "Moderation"
function_name: onlyForChannels
syntax: $onlyForChannels[channelID1;channelID2;...;(errorMessage)]
description: Function guard qui stops l'exécution si the command is not executed in the un channels spécifiés.
---

# $onlyForChannels

The function guard `$onlyForChannels` limit l'exécution of a command to un or several channels Discord specifics. Si the command est executed ailleurs, it is interrompue.

## Syntax

```
$onlyForChannels[channelID1;channelID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `channelID1;channelID2;...` | Snowflake[] | IDs channels alloweds, separateds par `;`. |
| `errorMessage` | String (optional) | Message sent if the channel is not allowed. |

## Behavior

- Compare the ID of the channel courant with the list fournie.
- Si le channel fait partie of la list, the command continue normalement.
- Si le channel n'est **pas** in the list, the command est interrompue.
- Pratique pour create channels dédiés (ex: channel `#commands`, `#bots`).

## Examples

### Channel of commands dédié

```bdfd
$onlyForChannels[123456789012345678;❌ Utilisez cette command in <#123456789012345678>.]
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

- Utilisez le **Mode Développeur** Discord pour copier facilement les IDs of channels.
- `$onlyForChannels` fait une **whitelist** (autorise certains channels). Pour une **blacklist** (interdire certains channels), utilisez `$ignoreChannels`.
- Pour restrict par catégorie entière, utilisez `$onlyForCategories`.
- Combinez with `$onlyForServers` pour restrict to certains servers + certains channels.
