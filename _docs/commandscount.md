---
layout: doc
title: $commandsCount
translation_key: docs
category: "Entity Info"
function_name: commandsCount
syntax: $commandsCount
description: Returns the total number of commands (prefix + slash) of the bot.
---

# $commandsCount

The `$commandsCount` function **returns the total number of commands** registered for the bot, including both prefix and slash commands.

## Syntax

```
$commandsCount
```

## Parameters

None.

## Return value

- **Type**: Integer
- The total number of commands (e.g., `42`).

## Behavior

- Counts all commands, whether they are prefix or slash.
- Updates automatically when commands are added or deleted.
- Includes commands in all folders.

## Examples

### Bot information page

```bdfd
$title[🤖 $botName]
$addField[📊 Statistics;;yes]
$addField[Total commands;$commandsCount;yes]
$addField[Slash;$slashCommandsCount;yes]
$addField[Prefix;$math[$commandsCount-$slashCommandsCount];yes]
$thumbnail[$botAvatar]
$color[#5865F2]
$sendMessage[]
```

### Comparison of servers and commands

```bdfd
$title[📈 Global Statistics]
$description[
**Servers:** $guildCount
**Users:** $membersCount
**Commands:** $commandsCount
**Slash:** $slashCommandsCount
**Runtime:** $nodeVersion
]
$sendMessage[]
```

### Update announcement

```bdfd
$sendMessage[🎉 **New Update!**
The bot now has **$commandsCount commands**!

Type `/help` to discover them.]
```

### Command limit (premium)

```bdfd
$if[$premiumExpireTime==]
  $if[$commandsCount>=50]
    $sendMessage[⚠️ Limit of 50 commands reached (free version).
    Upgrade to premium to unlock more commands.]
  $else
    $sendMessage[📊 $commandsCount/50 commands used.]
  $endif
$else
  $sendMessage[💎 $commandsCount commands (Premium - unlimited).]
$endif
```

## Notes

- Includes all commands (prefix AND slash).
- For slash commands only, use `$slashCommandsCount`.
- To get the list of names, use `$botCommands`.
- The limit varies depending on the subscription (free/premium).
