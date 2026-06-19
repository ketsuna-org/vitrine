---
layout: doc
title: $blacklistUsers
translation_key: docs
category: "Moderation"
function_name: blacklistUsers
syntax: $blacklistUsers[userID1;userID2;...;(errorMessage)]
description: Function guard qui blacklist of users by ID. Alias of $blacklistIDs. The command est interrompue if the user est in the list.
---

# $blacklistUsers

The function guard `$blacklistUsers` bloque l'execution of the command for users listés. This is un alias direct of `$blacklistIDs`.

## Syntax

```
$blacklistUsers[userID1;userID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `userID1;userID2;...` | Snowflake[] | IDs of users to blacklistr. |
| `errorMessage` | String (optional) | Message sent to the user blacklisté. |

## Behavior

- If the user est in the list, la command est interrompue.
- If a message error is provided, il is sent before l'interruption.
- Alias exact of `$blacklistIDs`.

## Examples

### Blacklist with message

```bdfd
$blacklistUsers[111111111111111111;222222222222222222;❌ Vous êtes blacklisté.]
$sendMessage[Accès allowed.]
```

### Blacklist silencieuse

```bdfd
$blacklistUsers[123456789012345678]
$sendMessage[OK.]
```

## Notes

- `$blacklistUsers` and `$blacklistIDs` sont interchangeables.
- Pour blacklistr of roles, use `$blacklistRoles`.
- Pour whitelistr (autoriser only certains users), use `$onlyForUsers`.
