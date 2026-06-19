---
layout: doc
title: $modifyChannelPerms
translation_key: docs
category: "Moderation"
function_name: modifyChannelPerms
syntax: $modifyChannelPerms[channelID;roleOrUserID;permissions]
description: Modifies thes permissions of a role or user sur un canal en utilisant des noms de permissions lisibles (sendmessages, viewchannel, etc.).
---

# $modifyChannelPerms

The function `$modifyChannelPerms[]` allows **modifier les permissions** of a role or user sur un canal with ae syntaxe lisible.

## Syntax

```
$modifyChannelPerms[channelID;roleOrUserID;permissions]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the canal cible. |
| `roleOrUserID` | The ID of the role or of the user. |
| `permissions` | Permissions avec `+` (autoriser) or `-` (refuser). Ex : `+sendmessages -attachfiles`. |

## Return Value

This function ne retourne pas de value.

## Behavior

- Plus lisible que `$editChannelPerms[]` thanks to thex noms de permissions.
- Permissions availables : `viewchannel`, `sendmessages`, `managemessages`, `embedlinks`, `attachfiles`, `readmessagehistory`, `mentioneveryone`, `useexternalemojis`, `connect`, `speak`, `mute`, `deafen`, `move`, `usevad`, `priorityspeaker`, `stream`, etc.
- The bot doit avoir `MANAGE_CHANNELS` or `MANAGE_ROLES`.

## Examples

### Channel private

```bdfd
$modifyChannelPerms[$channelID;$guildID;-viewchannel]
$modifyChannelPerms[$channelID;$vipRoleID;+viewchannel +sendmessages]
$sendMessage[Channel VIP configured.]
```

### Verrouillage fast

```bdfd
$modifyChannelPerms[$channelID;$guildID;-sendmessages]
$sendMessage[🔒 Canal verrouillé.]
```

### Déverrouillage

```bdfd
$modifyChannelPerms[$channelID;$guildID;+sendmessages]
$sendMessage[🔓 Canal déverrouillé.]
```

### Permissions mixtes

```bdfd
$modifyChannelPerms[$channelID;$mutedRoleID;-sendmessages -speak -connect]
$sendMessage[Permissions of the role muet appliquées.]
```

## Notes

- `$modifyChannelPerms[]` est recommended because plus lisible que `$editChannelPerms[]`.
- `$guildID` represents @everyone.
- Les permissions non mentionnées restent inchangées.
