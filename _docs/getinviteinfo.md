---
layout: doc
title: $getInviteInfo
translation_key: docs
category: "Moderation"
function_name: getInviteInfo
syntax: $getInviteInfo[code]
description: Gets information on a invite Discord from son code. Returns détails like the name of the server, the namebre of members, etc.
---

# $getInviteInfo

The function `$getInviteInfo[]` allows **récupérer information** on a invite Discord from son code.

## Syntax

```
$getInviteInfo[code]
```

## Parameters

| Parameter | Description |
|---|---|
| `code` | Le code of invite (ex: `abc123` pour `discord.gg/abc123`). |

## Return Value

- **Type** : String
- Informations on the invite : nom of the server, description, number of members, etc.
- String vide si l'invite est invalid or expirée.

## Behavior

- Works with n'importe quel code of invite Discord valid.
- Ne requires pas que the bot soit on the server cible.
- Returns information publics only.

## Examples

### Vérifier une invite

```bdfd
$let[info;$getInviteInfo[$message[1]]]
$if[$info!=]
  $sendMessage[Informations on the invite :
>>> $info]
$else
  $sendMessage[❌ Invite invalid or expirée.]
$endif
```

### Détection of spam of invite

```bdfd
$if[$checkContains[$message;discord.gg]==true]
  $deleteCommand
  $let[code;$replaceText[$message;https://discord.gg/;]]
  $let[info;$getInviteInfo[$code]]
  $if[$info!=]
    $sendMessage[⚠️ $username, les invites externals are not allowedes. \
(Invite vers : $info)]
  $else
    $sendMessage[⚠️ $username, les invites are not allowedes.]
  $endif
$endif
```

## Notes

- L'invite must be valid and non expirée.
- Utile for the modération anti-spam of invites.
- Les information retournées dépendent of ce que the server rend public.
