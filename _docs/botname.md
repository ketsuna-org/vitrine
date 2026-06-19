---
layout: doc
title: $botName
translation_key: docs
category: "Entity Info"
function_name: botName
syntax: $botName
description: Returns the name of user of the bot.
---

# $botName

The `$botName` function **retourne the name of user current of the bot** tel qu'il apparaît on Discord.

## Syntax

```
$botName
```

## Parameters

Aucun.

## Return value

- **Type** : String
- The name of user of the bot (ex: `MonSuperBot`).

## Behavior

- Returns the username of the bot, pas the name of affichage server (nickname).
- The name est celui configured in the portail développeur Discord.
- Se met to day automatically if the bot est renommé.

## Examples

### Message of bienvenue

```bdfd
$title[👋 Bienvenue on $serverName !]
$description[
Je suis **$botName**, votre assistant.
Tapez `!help` pour voir mes commands.
]
$thumbnail[$botAvatar]
$color[#5865F2]
$sendMessage[]
```

### Page of information

```bdfd
$title[🤖 À propos of $botName]
$addField[Nom;$botName;yes]
$addField[ID;$botID;yes]
$addField[Owner;<@$botOwnerID>;yes]
$addField[Commands;$commandsCount;yes]
$addField[Node;$botNode;yes]
$thumbnail[$botAvatar]
$color[#57F287]
$sendMessage[]
```

### Présentation

```bdfd
$sendMessage[Bonday ! Je suis $botName, un bot polyvaslow created with BDFD. 💪]
```

## Notes

- `$botName` est en lecture seule.
- Pour changer the name of the bot, use `$changeUsername[]`.
- Pour obtenir the ID of the bot, use `$botID`.
- For the avatar, use `$botAvatar`.
