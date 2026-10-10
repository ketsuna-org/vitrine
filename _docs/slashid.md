---
layout: doc
title: $slashID
translation_key: docs
category: "Entity Info"
function_name: slashID
syntax: $slashID[(commandName)]
description: Returns the Discord ID of the slash command being executed, or of the global slash command with the given name. Raises an error when the ID is unavailable.
---

# $slashID

The function `$slashID` **returns the Discord ID (snowflake) of a slash command**: either the command currently being executed, or a global slash command found by name.

## Syntax

```
$slashID[(commandName)]
```

## Parameters

| Parameter | Description |
|---|---|
| `commandName` | *(Optional)* The exact name of a global slash command of the bot. If omitted, the command being executed is used. An empty value raises `Slash command name is required.`; an unknown name raises `Global slash command not found.` |

## Return Value

- **Type**: String
- Without argument: the value of the `interaction.command.id` context variable supplied by the host. If it is missing or empty (for example outside a slash command), the error `Executed slash command ID is unavailable.` is raised: the function does **not** return an empty string.
- With a name: the ID of the global chat input command with that name, read from Discord.

## Behavior

- Because of the error, test `$isSlash` first when the same script can run as a slash command and as a prefix command.

## Examples

### Detailed log

```bdfd
$if[$isSlash==true]
  $log[🔹 SLASH | ID: $slashID | Name: $commandName | User: $userName ($authorID) | Server: $serverName]
$else
  $log[🔸 PREFIX | Name: $commandName | Trigger: $commandTrigger | User: $userName]
$endif
```

### Debug command

```bdfd
$if[$authorID!=$botOwnerID]
  $stop
$endif

$title[🔍 Debug Command]
$description[
**Name:** $commandName
**Trigger:** $commandTrigger
**Type:** $commandType
**Folder:** $commandFolder
**Author:** $userName ($authorID)
**Server:** $serverName ($guildID)
**Channel:** $channelName[$channelID] ($channelID)
]
$color[#5865F2]
```

### Conditional behavior

```bdfd
$if[$isSlash==true]
  $var[mode;slash]
$else
  $var[mode;prefix]
$endif

📌 Mode: $var[mode]
```

### Command information for support

```bdfd
$if[$isSlash==true]
  🆔 **Slash Command ID:** $slashID
  ┗ Name: $commandName
$else
  📝 **Prefix Command**
  ┗ Trigger: $commandTrigger
$endif
```

## Related functions

- [$isSlash](/docs/isslash/) — check if command is running in slash mode
- [Execution model](/docs/execution-model/) — options variables and slash interaction flow

## Notes

- Outside a slash command, `$slashID` without argument raises an error; it never returns an empty string.
- To check if a command is a slash command, use `$isSlash` or `$commandType`.
