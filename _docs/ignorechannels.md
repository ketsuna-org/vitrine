---
layout: doc
title: $ignoreChannels
translation_key: docs
category: "Moderation"
function_name: ignoreChannels
syntax: $ignoreChannels[channelID1;channelID2;...]
description: Function guard qui ignore silencieusement l'exécution of the command si it is triggerede in the un channels listés.
---

# $ignoreChannels

The function guard `$ignoreChannels` interrompt **silencieusement** l'exécution of the command si elle is usede in the un channels spécifiés. Contrairement to `$onlyForChannels` qui fait une whitelist, `$ignoreChannels` fait une **blacklist** of channels.

## Syntax

```
$ignoreChannels[channelID1;channelID2;...]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `channelID1;channelID2;...` | Snowflake[] | IDs channels to ignorer, separateds par `;`. |

## Behavior

- Si le channel courant est in the list, the command est interrompue **without no message** (silence total).
- Si le channel is not in the list, the command continue normalement.
- Aucun error message n'est supporté — le guard est strictement silencieux.

## Examples

### Interdire les channels of discussion générale

```bdfd
$ignoreChannels[123456789012345678]
$sendMessage[Command of modération executed.]
```

### Plusieurs channels blacklistés

```bdfd
$ignoreChannels[111111111111111111;222222222222222222;333333333333333333]
$ban[$mentioned[1]]
```

### Ignorer les channels of annonces

```bdfd
$ignoreChannels[123456789012345678;987654321098765432]
$sendMessage[Action effectuée.]
```

## Notes

- `$ignoreChannels` est une **blacklist** silencieuse. Pour une **whitelist** with error message, utilisez `$onlyForChannels`.
- Aucun error message n'est sent to the user. Si vous voulez notifier the user, utilisez `$onlyForChannels` with a error message.
- À placer en début of command, before toute autre logique.
- Pratique pour désenable commands in channels specifics without spammer les users.
