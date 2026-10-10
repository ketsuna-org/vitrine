---
layout: doc
title: $commandsCount
translation_key: docs
category: "Entity Info"
function_name: commandsCount
syntax: $commandsCount
description: Returns the number of commands stored for the bot (all trigger types).
---

# $commandsCount

The `$commandsCount` function **returns the number of commands stored for the bot**, whatever their trigger type (prefix, slash, hybrid...).

## Syntax

```
$commandsCount
```

## Parameters

None (passing one is an error).

## Return value

- **Type**: Integer
- The total number of commands (e.g., `42`).

## Behavior

- Counts every stored command of the bot, whatever its trigger type, in all folders.
- The list is read again from the bot's store each time the function runs, so it reflects added or deleted commands.

## Examples

### Bot information page

```bdfd
$title[🤖 $botName]
$addField[📊 Statistics;;yes]
$addField[Total commands;$commandsCount;yes]
$addField[Slash;$slashCommandsCount;yes]
$thumbnail[$userAvatar[$botID]]
$color[#5865F2]
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
```

### Update announcement

```bdfd
$sendMessage[🎉 **New Update!**
The bot now has **$commandsCount commands**!

Type `/help` to discover them.]
```

## Notes

- Includes all commands stored for the bot.
- `$slashCommandsCount` is a different count: it is the number of global chat-input (slash) commands that Discord lists for the application, so the two numbers are not related by a subtraction.
- To get the list of names, use `$botCommands`.
