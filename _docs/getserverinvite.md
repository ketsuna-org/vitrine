---
layout: doc
title: $getServerInvite
translation_key: docs
category: "Moderation"
function_name: getServerInvite
syntax: $getServerInvite[(guildID)]
description: Generates or retourne une invite permanent for the server. Si no ID n'est fourni, crée une invite for the server courant.
---

# $getServerInvite

The function `$getServerInvite[]` allows **générer or récupérer une invite** for a server Discord.

## Syntax

```
$getServerInvite[(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | Optional - ID of the server. Default: server où the command est executed. |

## Return Value

- **Type** : String (URL)
- The URL of invite of the server (format `https://discord.gg/CODE`).
- String vide si the bot n'a pas la permission `CREATE_INSTANT_INVITE`.

## Behavior

- The bot doit avoir la permission `CREATE_INSTANT_INVITE` on the server cible.
- L'invite createde est generally permanent (without expiration).
- Si une invite existe déjà, elle can be réutilisée.

## Examples

### Link of invite server

```bdfd
$title[🌐 Invite server]
$description[
Voici le link of invite pour **$serverName** :

```
$getServerInvite
```

Partagez-le with vos amis !
]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendMessage[]
```

### Display in a message of bienvenue

```bdfd
$title[👋 Bienvenue on $serverName !]
$description[
**Invite tes amis :**
$getServerInvite

Nous sommes now **$membersCount** members !
]
$color[#57F287]
$sendMessage[]
```

### Information server complete

```bdfd
$title[📊 Informations of the server]
$description[
**Nom :** $serverName
**Members :** $membersCount
**Boost :** Level $boostLevel
**Invite :** $getServerInvite
]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendMessage[]
```

## Notes

- L'invite createde utilise le canal où the command est executed (or le canal système).
- Pour inviter the bot lui-même, utilisez `$getBotInvite[]`.
- Pour obtenir information on a invite, utilisez `$getInviteInfo[]`.
