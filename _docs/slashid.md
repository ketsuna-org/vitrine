---
layout: doc
title: $slashID
translation_key: docs
category: "Entity Info"
function_name: slashID
syntax: $slashID
description: Returns the Discord ID of the slash command currently being executed.
---

# $slashID

The function `$slashID` **returns the Discord ID (snowflake) of the slash command** currently being executed. If the command is not a slash command, it returns an empty string.

## Syntax

```
$slashID
```

## Parameters

None.

## Return Value

- **Type**: String
- The Discord ID of the slash command (e.g., `1234567890123456789`).
- An empty string if the current command is a prefix command.

## Behavior

- The ID is assigned by Discord during the registration of the command.
- Useful for logging, debugging, or unique identification.
- Returns empty for prefix commands.

## Examples

### Detailed log

```bdfd
$if[$slashID!=]
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
**Slash ID:** $if[$slashID!=]$slashID$elseN/A (prefix)$endif
**Author:** $userName ($authorID)
**Server:** $serverName ($guildID)
**Channel:** $channelName ($channelID)
]
$color[#5865F2]
$sendMessage[]
```

### Conditional behavior

```bdfd
$if[$slashID!=]
  $var[mode;slash]
  $var[args;$slashOption[1]]
$else
  $var[mode;prefix]
  $var[args;$message[1]]
$endif

$sendMessage[📌 Mode: $var[mode] | Args: $var[args]]
```

### Command information for support

```bdfd
$if[$slashID!=]
  $sendMessage[🆔 **Slash Command ID:** $slashID
  ┗ Name: $commandName]
$else
  $sendMessage[📝 **Prefix Command**
  ┗ Trigger: $commandTrigger]
$endif
```

## Notes

- Returns an empty string for prefix commands.
- The ID is unique and assigned by Discord.
- Useful for technical support (provide the ID in case of a bug).
- To check if a command is a slash command, use `$isSlash` or `$commandType`.
