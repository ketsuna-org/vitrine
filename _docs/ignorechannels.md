---
layout: doc
title: $ignoreChannels
translation_key: docs
category: "Moderation"
function_name: ignoreChannels
syntax: $ignoreChannels[channelID1;channelID2;...]
description: Function guard qui ignore silencieusement l'exécution of the command si it is déclenchée in the un des channels listés.
---

# $ignoreChannels

The function guard `$ignoreChannels` interrompt **silencieusement** l'exécution of the command si elle is usede in the un des channels spécifiés. Contrairement à `$onlyForChannels` qui fait une whitelist, `$ignoreChannels` fait une **blacklist** de channels.

## Syntax

```
$ignoreChannels[channelID1;channelID2;...]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `channelID1;channelID2;...` | Snowflake[] | IDs des channels à ignorer, separateds par `;`. |

## Behavior

- Si le channel courant est in the list, the command est interrompue **without no message** (silence total).
- Si le channel is not in the list, the command continue normalement.
- Aucun error message n'est supporté — le guard est strictement silencieux.

## Examples

### Interdire les channels de discussion générale

```bdfd
$ignoreChannels[123456789012345678]
$sendMessage[Command de modération executed.]
```

### Plusieurs channels blacklistés

```bdfd
$ignoreChannels[111111111111111111;222222222222222222;333333333333333333]
$ban[$mentioned[1]]
```

### Ignorer les channels d'annonces

```bdfd
$ignoreChannels[123456789012345678;987654321098765432]
$sendMessage[Action effectuée.]
```

## Notes

- `$ignoreChannels` est une **blacklist** silencieuse. Pour une **whitelist** avec error message, utilisez `$onlyForChannels`.
- Aucun error message n'est sent à the user. Si vous voulez notifier the user, utilisez `$onlyForChannels` with a error message.
- À placer en début de command, before toute autre logique.
- Pratique pour désactiver des commands dans des channels spécifiques without spammer les users.
