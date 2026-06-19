---
layout: doc
title: $slashCommandsCount
translation_key: docs
category: "Entity Info"
function_name: slashCommandsCount
syntax: $slashCommandsCount
description: Returns the number of commands slash enregistrées on the bot.
---

# $slashCommandsCount

The function `$slashCommandsCount` **retourne the namebre of commands slash** enregistrées on the bot (kicks thes commands prefix).

## Syntax

```
$slashCommandsCount
```

## Parameters

Aucun.

## Return Value

- **Type** : Integer
- The namebre of commands slash (ex: `25`).

## Behavior

- Counts only les commands of type slash.
- Ne compte pas les commands prefix.
- Utile pour check thes limits Discord (100 commands slash par application).

## Examples

### Dashboard statistique

```bdfd
$title[📊 Commands]
$addField[🔹 Slash;$slashCommandsCount;yes]
$addField[🔸 Prefix;$math[$commandsCount-$slashCommandsCount];yes]
$addField[📦 Total;$commandsCount;yes]
$footer[Limit Discord : 100 slash commands]
$color[#5865F2]
$sendMessage[]
```

### Vérification of limit Discord

```bdfd
$if[$slashCommandsCount>=100]
  $sendMessage[⚠️ **Warning:** Vous avez atteint la limit of 100 commands slash Discord.
  Les news commands slash pourraient ne pas s'enregistrer.]
$else
  $var[restant;$math[100-$slashCommandsCount]]
  $sendMessage[✅ $slashCommandsCount/100 commands slash utilisées ($var[restant] restantes).]
$endif
```

### Information bot

```bdfd
$title[🤖 $botName - Statistiques]
$description[
**Total commands :** $commandsCount
**Slash :** $slashCommandsCount
**Prefix :** $math[$commandsCount-$slashCommandsCount]
**Servers :** $guildCount
**Users :** $membersCount
]
$thumbnail[$botAvatar]
$color[#57F287]
$sendMessage[]
```

## Notes

- Counts only les commands slash.
- Pour le total (prefix + slash), utilisez `$commandsCount`.
- Discord limit to 100 commands slash par application.
- Pour the ID of a command slash, utilisez `$slashID`.
