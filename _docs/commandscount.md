---
layout: doc
title: $commandsCount
translation_key: docs
category: "Entity Info"
function_name: commandsCount
syntax: $commandsCount
description: Returns the namebre total of commands (prefix + slash) of the bot.
---

# $commandsCount

The `$commandsCount` function **retourne the namebre total of commands** enregistrées on the bot, incluant les commands prefix and slash.

## Syntax

```
$commandsCount
```

## Parameters

Aucun.

## Return value

- **Type** : Integer
- The namebre total of commands (ex: `42`).

## Behavior

- Counts all commands, qu'elles soient prefix or slash.
- Se met to day automatically when commands sont ajoutées/deletedes.
- Inclut les commands in all folders.

## Examples

### Page of information of the bot

```bdfd
$title[🤖 $botName]
$addField[📊 Statistiques;;yes]
$addField[Total commands;$commandsCount;yes]
$addField[Slash;$slashCommandsCount;yes]
$addField[Prefix;$math[$commandsCount-$slashCommandsCount];yes]
$thumbnail[$botAvatar]
$color[#5865F2]
$sendMessage[]
```

### Compareason servers/commands

```bdfd
$title[📈 Statistiques globals]
$description[
**Servers :** $guildCount
**Users :** $membersCount
**Commands :** $commandsCount
**Slash :** $slashCommandsCount
**Runtime :** $nodeVersion
]
$sendMessage[]
```

### Annonce of mise to day

```bdfd
$sendMessage[🎉 **Mise to day !**
The bot dispose now of **$commandsCount commands** !

Tapez `/help` for découvrir.]
```

### Limit of commands (premium)

```bdfd
$if[$premiumExpireTime==]
  $if[$commandsCount>=50]
    $sendMessage[⚠️ Limit of 50 commands atteinte (version gratuite).
    Passez premium pour débloquer more than commands.]
  $else
    $sendMessage[📊 $commandsCount/50 commands utilisées.]
  $endif
$else
  $sendMessage[💎 $commandsCount commands (Premium - illimité).]
$endif
```

## Notes

- Inclut all commands (prefix ET slash).
- For commands slash only, use `$slashCommandsCount`.
- For the list noms, use `$botCommands`.
- La limit varie according to l'abonnement (gratuit/premium).
