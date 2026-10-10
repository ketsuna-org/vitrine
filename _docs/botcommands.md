---
layout: doc
title: $botCommands
translation_key: docs
category: "Entity Info"
function_name: botCommands
syntax: $botCommands[separator]
description: Returns the names of the commands registered on the bot, joined by the separator you provide.
---

# $botCommands

The `$botCommands` function **returns the list of names of all commands** registered on the bot, joined by the separator you provide.

## Syntax

```
$botCommands[separator]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Required. The text inserted between command names. An empty separator raises the error `Separator is required.` |

## Return value

- **Type**: String
- The command names joined by `separator` (e.g., `help, ping, ban` with `, `).

## Behavior

- The names come from the commands stored for the bot.
- Prefix and hybrid commands are returned with the bot prefix in front of their trigger (e.g., `!help`); other commands are returned under their plain name.
- The order is the order of the stored commands.

## Examples

### Basic help command

```bdfd
$title[📚 Commands of $botName]
$description[
Here are all my commands:
$botCommands[, ]
]
$footer[Total: $commandsCount commands]
$color[#5865F2]
```

## Notes

- Commands are returned as plain text, joined by the separator.
- For the total number of commands, use `$commandsCount`.
- For the number of slash commands only, use `$slashCommandsCount`.
- `$botCommands` can be very large on bots with many commands.
