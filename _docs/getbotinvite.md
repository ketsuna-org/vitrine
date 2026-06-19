---
layout: doc
title: $getBotInvite
translation_key: docs
category: "Moderation"
function_name: getBotInvite
syntax: $getBotInvite[(guildID)]
description: Generates and retourne le link d'invite of the bot with thes permissions nécessaires. Si un guildID est fourni, le link est pré-rempli pour ce server.
---

# $getBotInvite

The function `$getBotInvite[]` allows **générer le link d'invite of the bot** with thes permissions nécessaires à son functionnement.

## Syntax

```
$getBotInvite[(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | Optional - ID of the server pour pré-sélectionner the server in the interface d'invite. |

## Return Value

- **Type** : String (URL)
- The URL d'invite complete of the bot.
- Format : `https://discord.com/oauth2/authorize?clinkt_id=ID&permissions=...&scope=bot`

## Behavior

- Les permissions includedes in the link correspondent à celles configuredes for the bot.
- Si un guildID est fourni, le sélecteur de server est pré-rempli.
- Le link inclut le scope `bot` and `applications.commands` automatically.

## Examples

### Command d'invite

```bdfd
$title[📨 Inviter the bot]
$description[
Cliquez sur le link ci-dessous pour inviter the bot sur votre server :

[$getBotInvite]

**Permissions requiredes :**
- Gérer les messages
- Envoyer des messages
- Intégrer des links
- Lire l'historique
]
$color[#5865F2]
$sendMessage[]
```

### Link pour ce server

```bdfd
$title[🔗 Link d'invite]
$description[
Partagez ce link pour inviter the bot sur **$serverName** :

```
$getBotInvite[$guildID]
```
]
$sendMessage[]
```

### Command info + invite

```bdfd
$title[🤖 Informations of the bot]
$description[
**Nom :** $botName
**Servers :** $guildCount
**Users :** $membersCount

[🔗 Inviter the bot]($getBotInvite)
]
$thumbnail[$botAvatar]
$color[#57F287]
$sendMessage[]
```

## Notes

- Les permissions in the link sont définies in the configuration de l'application Discord.
- Le link ne functionne que si the bot est public or si the user a accès au server.
- Pour une invite de server (pas of the bot), utilisez `$getServerInvite[]`.
