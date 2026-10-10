---
layout: doc
title: $slashCommandsCount
translation_key: docs
category: "Entity Info"
function_name: slashCommandsCount
syntax: $slashCommandsCount
description: Returns the number of global slash (chat input) commands registered on Discord for the bot.
---

# $slashCommandsCount

The function `$slashCommandsCount` **returns the number of global slash commands** of the bot: the engine asks Discord for the application's global commands and counts those of the chat input type.

## Syntax

```
$slashCommandsCount
```

## Parameters

None.

## Return Value

- **Type**: Integer
- The number of global chat input commands (e.g., `25`).

## Behavior

- The list is read from Discord at each call (not from the bot's stored commands).
- Only global commands of the chat input type are counted; guild-specific commands, user/message context menu commands and prefix commands are not.
- `$commandsCount` counts the bot's stored commands instead (see its page).

## Examples

### Statistics dashboard

```bdfd
$title[📊 Commands]
$addField[🔹 Slash;$slashCommandsCount;yes]
$addField[📦 Stored commands;$commandsCount;yes]
$color[#5865F2]
```

### Simple condition

```bdfd
$if[$slashCommandsCount==0]
  $sendMessage[No global slash command is registered yet.]
$else
  $sendMessage[✅ $slashCommandsCount global slash commands registered.]
$endif
```

### Bot information

```bdfd
$title[🤖 $botName - Statistics]
$description[
**Stored commands:** $commandsCount
**Global slash commands:** $slashCommandsCount
**Servers:** $guildCount
**Members of this server:** $membersCount
]
$thumbnail[$userAvatar[$botID]]
$color[#57F287]
```

## Notes

- For the number of stored commands of the bot, use `$commandsCount`.
- For the ID of a slash command, use `$slashID`.
