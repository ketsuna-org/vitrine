---
layout: doc
title: $hasPerms
translation_key: docs
category: "Moderation"
function_name: hasPerms
syntax: $hasPerms[userID;permission1;permission2;...]
description: Checks if un user possède all permissions spécifiées. Returns "true" or "false". Vérification inline, n'interrompt pas the command.
---

# $hasPerms

The function `$hasPerms` est une **vérification inline** of permissions. Contrairement to the guards (`$onlyPerms`, `$onlyBotPerms`), elle n'interrompt pas the command mais retourne `"true"` or `"false"`, permettant une gestion conditionnelle fine.

## Syntax

```
$hasPerms[userID;permission1;permission2;...]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `userID` | Snowflake | The ID of the user dont on veut check thes permissions. |
| `permission1;permission2;...` | String[] | List permissions to vérifier. **Toutes** les permissions must be présentes. |

## Return Value

- **Type** : String `"true"` or `"false"`
- `"true"` : the user possède **all** les permissions listées
- `"false"` : il manque to the moins une permission

## Behavior

- Checks les permissions globals of the user on the server.
- La vérification est of type **ET** : all permissions listées sont requiredes.
- La permission `Administrator` satisfait implicitement all autres.
- **N'interrompt pas** the command (contrairement to `$onlyPerms`).

## Examples

### Vérification conditionnelle simple

```bdfd
$if[$hasPerms[$authorID;BanMembers]==true]
  $ban[$mentioned[1];$noMentionMessage]
  $sendMessage[Member banni.]
$else
  $sendMessage[❌ Vous n'avez pas la permission of bannir.]
$endif
```

### Multi-permissions

```bdfd
$if[$hasPerms[$authorID;ManageMessages;ManageChannels]==true]
  $clear[$message[1]]
  $sendMessage[$message[1] messages deleteds.]
$else
  $sendMessage[❌ Permissions insuffisantes.]
$endif
```

### Vérifier les permissions of the bot

```bdfd
$if[$hasPerms[$botID;KickMembers]==false]
  $sendMessage[⚠️ Je n'ai pas la permission of expulser. Veuillez check mes permissions.]
  $stop
$endif
$kick[$mentioned[1]]
```

### Log conditionnel

```bdfd
$if[$hasPerms[$authorID;Administrator]==true]
  $log[Action admin : $userName a utilisé the command.]
$endif
```

## Notes

- `$hasPerms` est une function **inline** : elle ne bloque pas the command. Utilisez-la with `$if` pour create comportements conditionnels.
- Pour the bot, utilisez `$botID` like `userID`.
- Les noms of permissions sont en **PascalCase** (`BanMembers`, `KickMembers`, `ManageMessages`, etc.).
- Pour une vérification with interruption automatique, utilisez `$onlyPerms` (user) or `$onlyBotPerms` (bot).
- `$checkUserPerms` est un alias of `$hasPerms`.
