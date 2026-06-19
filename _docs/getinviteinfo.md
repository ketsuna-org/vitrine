---
layout: doc
title: $getInviteInfo
translation_key: docs
category: "Moderation"
function_name: getInviteInfo
syntax: $getInviteInfo[code]
description: Gets des informations sur une invite Discord from son code. Returns des détails comme the name of the server, the namebre de members, etc.
---

# $getInviteInfo

The function `$getInviteInfo[]` allows **récupérer des informations** sur une invite Discord from son code.

## Syntax

```
$getInviteInfo[code]
```

## Parameters

| Parameter | Description |
|---|---|
| `code` | Le code d'invite (ex: `abc123` pour `discord.gg/abc123`). |

## Return Value

- **Type** : String
- Informations sur l'invite : nom of the server, description, number de members, etc.
- String vide si l'invite est invalid or expirée.

## Behavior

- Works with n'importe quel code d'invite Discord valid.
- Ne requires pas que the bot soit on the server cible.
- Returns des informations publics only.

## Examples

### Vérifier une invite

```bdfd
$let[info;$getInviteInfo[$message[1]]]
$if[$info!=]
  $sendMessage[Informations sur l'invite :
>>> $info]
$else
  $sendMessage[❌ Invite invalid or expirée.]
$endif
```

### Détection de spam d'invite

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
- Utile for the modération anti-spam d'invites.
- Les informations retournées dépendent de ce que the server rend public.
