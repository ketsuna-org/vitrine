---
layout: doc
title: $slashCommandsCount
translation_key: docs
category: "Entity Info"
function_name: slashCommandsCount
syntax: $slashCommandsCount
description: Returns the number of registered slash commands on the bot.
---

# $slashCommandsCount

The function `$slashCommandsCount` **returns the number of slash commands** registered on the bot (excluding prefix commands).

## Syntax

```
$slashCommandsCount
```

## Parameters

None.

## Return Value

- **Type**: Integer
- The number of slash commands (e.g., `25`).

## Behavior

- Counts only slash commands.
- Does not count prefix commands.
- Useful for checking Discord limits (100 slash commands per application).

## Examples

### Statistics dashboard

```bdfd
$title[📊 Commands]
$addField[🔹 Slash;$slashCommandsCount;yes]
$addField[🔸 Prefix;$math[$commandsCount-$slashCommandsCount];yes]
$addField[📦 Total;$commandsCount;yes]
$footer[Discord Limit: 100 slash commands]
$color[#5865F2]
$sendMessage[]
```

### Checking Discord limit

```bdfd
$if[$slashCommandsCount>=100]
  $sendMessage[⚠️ **Warning:** You have reached the limit of 100 Discord slash commands. New slash commands might not register.]
$else
  $var[restant;$math[100-$slashCommandsCount]]
  $sendMessage[✅ $slashCommandsCount/100 slash commands used ($var[restant] remaining).]
$endif
```

### Bot information

```bdfd
$title[🤖 $botName - Statistics]
$description[
**Total commands:** $commandsCount
**Slash:** $slashCommandsCount
**Prefix:** $math[$commandsCount-$slashCommandsCount]
**Servers:** $guildCount
**Users:** $membersCount
]
$thumbnail[$botAvatar]
$color[#57F287]
$sendMessage[]
```

## Notes

- Counts only slash commands.
- For the total (prefix + slash), use `$commandsCount`.
- Discord limits to 100 slash commands per application.
- For the ID of a slash command, use `$slashID`.
