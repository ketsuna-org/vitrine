---
layout: doc
title: $modifyChannelPerms
translation_key: docs
category: "Moderation"
function_name: modifyChannelPerms
syntax: $modifyChannelPerms[channelID;roleOrUserID;permissions]
description: Modifie les permissions d'un rôle ou utilisateur sur un canal en utilisant des noms de permissions lisibles (sendmessages, viewchannel, etc.).
parameters:
  - name: channelID
    description: L'ID du canal cible.
  - name: roleOrUserID
    description: L'ID du rôle ou de l'utilisateur.
  - name: permissions
    description: Liste de permissions avec + (autoriser) ou - (refuser), séparées par des espaces. Exemple : +sendmessages -viewchannel.
returns:
  - type: aucun
    description: Ne retourne rien. Les permissions sont modifiées.
related:
  - $editChannelPerms
  - $modifyChannel
  - $createChannel
examples:
  - description: Autoriser l'envoi de messages
    code: $modifyChannelPerms[$channelID;$roleID;+sendmessages]
  - description: Bloquer la vue du canal
    code: $modifyChannelPerms[$channelID;$roleID;-viewchannel]
---

# $modifyChannelPerms

La fonction `$modifyChannelPerms[]` permet de **modifier les permissions** d'un rôle ou utilisateur sur un canal avec une syntaxe lisible.

## Syntaxe

```
$modifyChannelPerms[channelID;roleOrUserID;permissions]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | L'ID du canal cible. |
| `roleOrUserID` | L'ID du rôle ou de l'utilisateur. |
| `permissions` | Permissions avec `+` (autoriser) ou `-` (refuser). Ex : `+sendmessages -attachfiles`. |

## Valeur de retour

Cette fonction ne retourne pas de valeur.

## Comportement

- Plus lisible que `$editChannelPerms[]` grâce aux noms de permissions.
- Permissions disponibles : `viewchannel`, `sendmessages`, `managemessages`, `embedlinks`, `attachfiles`, `readmessagehistory`, `mentioneveryone`, `useexternalemojis`, `connect`, `speak`, `mute`, `deafen`, `move`, `usevad`, `priorityspeaker`, `stream`, etc.
- Le bot doit avoir `MANAGE_CHANNELS` ou `MANAGE_ROLES`.

## Exemples

### Salon privé

```bdfd
$modifyChannelPerms[$channelID;$guildID;-viewchannel]
$modifyChannelPerms[$channelID;$vipRoleID;+viewchannel +sendmessages]
$sendMessage[Salon VIP configuré.]
```

### Verrouillage rapide

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
$sendMessage[Permissions du rôle muet appliquées.]
```

## Notes

- `$modifyChannelPerms[]` est recommandé car plus lisible que `$editChannelPerms[]`.
- `$guildID` représente @everyone.
- Les permissions non mentionnées restent inchangées.
