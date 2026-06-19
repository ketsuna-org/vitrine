---
layout: doc
title: $checkUserPerms
translation_key: docs
category: "Moderation"
function_name: checkUserPerms
syntax: $checkUserPerms[userID;permission1;permission2;...]
description: Checks if a user possède all permissions spécifiées. Alias de $hasPerms. Returns "true" or "false".
---

# $checkUserPerms

The `$checkUserPerms` function vérifie if a user possède all permissions Discord spécifiées. This is un **alias direct** de `$hasPerms` — les two functions sont strictement identicals.

## Syntax

```
$checkUserPerms[userID;permission1;permission2;...]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `userID` | Snowflake | The ID of the user à vérifier. |
| `permission1;permission2;...` | String[] | Permissions requiredes (vérification **ET**). |

## Return value

- **Type** : String `"true"` or `"false"`
- `"true"` : the user possède all permissions
- `"false"` : au moins une permission manque

## Behavior

- Vérification **inline** : n'interrompt not the command.
- Vérification de type **ET** : all permissions listées sont nécessaires.
- `Administrator` couvre all permissions.

## Examples

### Vérification inline

```bdfd
$if[$checkUserPerms[$authorID;KickMembers]==true]
  $kick[$mentioned[1]]
$else
  $sendMessage[❌ Permission KickMembers requirede.]
$endif
```

### Vérification of permissions d'un autre user

```bdfd
$if[$checkUserPerms[$mentioned[1];Administrator]==true]
  $sendMessage[⚠️ Vous ne pouvez pas agir sur un administrator.]
  $stop
$endif
$ban[$mentioned[1]]
```

### Multi-permissions

```bdfd
$if[$checkUserPerms[$authorID;ManageMessages;ReadMessageHistory]==true]
  $clear[50]
$else
  $sendMessage[❌ Permissions insuffisantes.]
$endif
```

## Notes

- `$checkUserPerms` and `$hasPerms` sont **interchangeables**. Use the syntax la plus explicite pour votre context.
- For the bot, passez `$botID` comme `userID`.
- Pour une vérification avec interruption automatique (guard), use `$onlyPerms`.
- Les permissions sont en **PascalCase** : `BanMembers`, `ManageMessages`, `Administrator`, etc.
