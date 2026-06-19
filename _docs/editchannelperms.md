---
layout: doc
title: $editChannelPerms
translation_key: docs
category: "Moderation"
function_name: editChannelPerms
syntax: $editChannelPerms[channelID;roleOrUserID;allow;deny]
description: Modifies thes permissions of a role or of a user on a canal specific en utilisant of values numériques of permissions.
---

# $editChannelPerms

The `$editChannelPerms[]` function **modifier les permissions of a role or user** on a canal via of values numériques (bitfields).

## Syntax

```
$editChannelPerms[channelID;roleOrUserID;allow;deny]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the canal cible. |
| `roleOrUserID` | The ID of the role or of the user. |
| `allow` | Bitfield of permissions to autoriser (integer). |
| `deny` | Bitfield of permissions to refuser (integer). |

## Return value

Cette function does not return a value.

## Behavior

- The bot must have `MANAGE_ROLES` or `MANAGE_CHANNELS`.
- Les permissions sont définies par of values numériques :
  - `1024` = Voir le canal
  - `2048` = Envoyer of messages
  - `4096` = Envoyer TTS
  - `8192` = Gérer les messages
  - `16384` = Intégrer links
  - etc.

## Examples

### Verrouiller un canal

```bdfd
$editChannelPerms[$channelID;$guildID;0;2048]
$sendMessage[Canal verrouillé : messages désenableds pour @everyone.]
```

### Déverrouiller un canal

```bdfd
$editChannelPerms[$channelID;$guildID;2048;0]
$sendMessage[Canal déverrouillé.]
```

### Channel private par role

```bdfd
$editChannelPerms[$channelID;$guildID;0;1024]
$editChannelPerms[$channelID;$vipRoleID;1024;0]
$sendMessage[Canal rendu private for the role VIP.]
```

## Notes

- Les permissions `allow` and `deny` sont sommes of flags. Additionnez les values pour combiner of permissions.
- `$guildID` represents the role @everyone.
- Pour une approche plus lisible, use `$modifyChannelPerms[]`.
