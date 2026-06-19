---
layout: doc
title: $onlyForIDs
translation_key: docs
category: "Moderation"
function_name: onlyForIDs
syntax: $onlyForIDs[userID1;userID2;...;(errorMessage)]
description: Function guard qui stops l'exécution si the ID of the user ne figure pas in the list des IDs alloweds. Alias de $onlyForUsers.
---

# $onlyForIDs

The function guard `$onlyForIDs` restreint l'exécution of a command à une list d'IDs users. C'est un alias direct de `$onlyForUsers` — les two functions sont interchangeables.

## Syntax

```
$onlyForIDs[userID1;userID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `userID1;userID2;...` | Snowflake[] | IDs Discord des users alloweds. |
| `errorMessage` | String (optional) | Message sent aux users non alloweds. |

## Behavior

- Compare the ID of the user déclencheur (`$authorID`) with the list.
- Si the ID correspond, the command continue.
- Si the ID ne correspond pas, the command est interrompue.
- Functionnellement identical à `$onlyForUsers`.

## Examples

### Command owner-only

```bdfd
$onlyForIDs[$botOwnerID;❌ Seul le owner peut utiliser cette command.]
$eval[$message]
```

### Plusieurs IDs alloweds

```bdfd
$onlyForIDs[111111111111111111;222222222222222222;333333333333333333]
$sendMessage[Accès allowed.]
```

### Error message informatif

```bdfd
$onlyForIDs[123456789012345678;❌ Cette command est en maintenance. Seul le développeur peut l'utiliser.]
```

## Notes

- `$onlyForIDs` and `$onlyForUsers` sont **strictement identicals**. Utilisez celui qui est le plus lisible dans votre context.
- Activez le **Mode Développeur** dans Discord (Parameters → Avancé) pour copier les IDs.
- Pour une blacklist d'IDs, utilisez `$blacklistIDs`.
- Si vous voulez autoriser un role integer plutôt que des users spécifiques, préférez `$onlyForRoles`.
