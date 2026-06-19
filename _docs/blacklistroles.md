---
layout: doc
title: $blacklistRoles
translation_key: docs
category: "Moderation"
function_name: blacklistRoles
syntax: $blacklistRoles[roleID1;roleID2;...;(errorMessage)]
description: Function guard qui blacklist of roles. If the user possède l'un of roles, la command est interrompue.
---

# $blacklistRoles

The function guard `$blacklistRoles` bloque l'execution of the command if the user possède **au moins un** of roles blacklistés.

## Syntax

```
$blacklistRoles[roleID1;roleID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `roleID1;roleID2;...` | Snowflake[] | IDs of roles à blacklistr, separateds par `;`. |
| `errorMessage` | String (optional) | Message sent if the user a a role blacklisté. |

## Behavior

- Checks if the user possède un of roles de la list.
- Si **au moins un** role correspond, la command est interrompue.
- Vérification de type **OU** (a singthe role blacklisté suffit à bloquer).
- If a message error is provided, il is sent ; otherwise, silence.

## Examples

### Bloquer users mutés

```bdfd
$blacklistRoles[123456789012345678;❌ Vous êtes currently mute. Contactez un modérateur.]
$sendMessage[Votre message has been traité.]
```

### Multi-roles blacklistés

```bdfd
$blacklistRoles[111111111111111111;222222222222222222;❌ Accès forbidden pour votre role.]
$clear[10]
$sendMessage[10 messages deleteds.]
```

### Blacklist silencieuse

```bdfd
$blacklistRoles[123456789012345678]
$sendMessage[Command executede.]
```

## Notes

- `$blacklistRoles` and `$blacklistRoleIDs` sont interchangeables.
- Pour whitelistr of roles, use `$onlyForRoles`.
- Très utile pour empêcher users mutés or en restriction d'utiliser des commands.
- Combinez avec `$blacklistUsers` for ae protection complete (roles + users spécifiques).
