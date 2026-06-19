---
layout: doc
title: $botCommands
translation_key: docs
category: "Entity Info"
function_name: botCommands
syntax: $botCommands
description: Returns a list of commands available on the bot.
---

# $botCommands

The `$botCommands` function **returns the list of names of all commands** registered on the bot, separated by newlines.

## Syntax

```
$botCommands
```

## Parameters

None.

## Return value

- **Type**: String
- A list of commands, one per line (e.g., `help`, `ping`, `ban`...).

## Behavior

- Returns both prefix and slash commands.
- Each command appears on a new row.
- The order matches the organization in the BDFD console.

## Examples

### Basic help command

```bdfd
$title[📚 Commands of $botName]
$description[
Here are all my commands:
```
$botCommands
```
]
$footer[Total: $commandsCount commands]
$color[#5865F2]
$sendMessage[]
```

### Paged help

```bdfd
$var[cmds;$botCommands]
$var[lines;$textSplit[$var[cmds];\n]]
$var[pages;$math[$arrayLength[$var[lines]]/10]]
$var[page;$message[1]]
$if[$isInteger[$var[page]]==false]
  $var[page;1]
$endif

$title[📚 Commands (page $var[page]/$var[pages])]
$description[
$arraySlice[$var[lines];$math[($var[page]-1)*10];10]
]
$footer[Total: $commandsCount commands]
$sendMessage[]
```

### Search for a command

```bdfd
$var[search;$message[1]]
$if[$var[search]==]
  $sendMessage[❌ Usage: !search <name>]
  $stop
$endif

$var[results;$advancedTextSplit[$botCommands;\n;$var[search]]]
$if[$arrayLength[$var[results]]==0]
  $sendMessage[❌ No commands found for "$var[search]".]
$else
  $title[🔍 Results for "$var[search]"]
  $description[$arraySlice[$var[results];0;20]]
  $sendMessage[]
$endif
```

## Notes

- Commands are returned as plain text (one per line).
- For the total number of commands, use `$commandsCount`.
- For the number of slash commands only, use `$slashCommandsCount`.
- `$botCommands` can be very large on bots with many commands.
