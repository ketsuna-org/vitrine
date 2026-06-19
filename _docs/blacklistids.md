---
layout: doc
title: $blacklistIDs
translation_key: docs
category: "Moderation"
function_name: blacklistIDs
syntax: $blacklistIDs[userID1;userID2;...;(errorMessage)]
description: Function guard qui blacklist of users by ID. If the user déclencheur est in the list, la command est interrompue.
---

# $blacklistIDs

The function guard `$blacklistIDs` bloque l'execution of the command for users dont the ID figure in the list. Contrairement à `$onlyForIDs` qui whitelist, `$blacklistIDs` fait une **blacklist**.

## Syntax

```
$blacklistIDs[userID1;userID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `userID1;userID2;...` | Snowflake[] | IDs of users à blacklistr, separateds par `;`. |
| `errorMessage` | String (optional) | Message sent à the user blacklisté. If omitted, silence. |

## Behavior

- Compare the ID of the user déclencheur with the list noire.
- If the ID correspond, la command est interrompue.
- If a message error is provided, il is sent before l'interruption.
- Without message error, le guard est silencieux.

## Examples

### Blacklist simple

```bdfd
$blacklistIDs[123456789012345678;❌ Vous avez été blacklisté de cette command.]
$sendMessage[Traitement effectué.]
```

### Blacklist multiple avec list external

```bdfd
$blacklistIDs[$getGlobalUserVar[blacklist];❌ Accès révoqué.]
$sendMessage[Bienvenue.]
```

### Without message (silencieux)

```bdfd
$blacklistIDs[111111111111111111;222222222222222222]
$sendMessage[OK.]
```

## Notes

- `$blacklistIDs` and `$blacklistUsers` sont interchangeables.
- Pour une blacklist persistante, combinez avec `$getGlobalUserVar` or `$getServerUserVar`.
- Pour blacklistr a role integer, use `$blacklistRoles` or `$blacklistRoleIDs`.
- L'inverse de cette function est `$onlyForIDs` (whitelist).
