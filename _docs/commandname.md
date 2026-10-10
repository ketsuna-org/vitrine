---
layout: doc
title: $commandName
translation_key: docs
category: "Entity Info"
function_name: commandName
syntax: $commandName
description: Returns the name of the command currently being executed.
---

# $commandName

The `$commandName` function **returns the name of the command currently being executed**, as stored for the bot.

## Syntax

```
$commandName
```

## Parameters

None (passing one is an error).

## Return value

- **Type**: String
- The name of the command (e.g., `help`, `ban`, `ping`), taken from the invocation metadata (`command.name`, or `commandName`).
- If the execution has no command metadata, the error `Invocation metadata command.name is unavailable.` is raised.

## Behavior

- Returns the stored name of the command, not the trigger actually typed (an alias or a prefix does not change it).
- Useful for logs, contextual help, and detection.

## Examples

### Execution log

```bdfd
$log[📌 $userName ($authorID) executed /$commandName in #$channelName[$channelID] on $serverName]
```

### Contextual help

```bdfd
$title[❓ Help: $commandName]
$description[
**Command:** $commandName
**Type:** $commandType
**Folder:** $commandFolder
**Trigger:** $commandTrigger
]
$footer[Used by $userName]
```

### Custom error handling

```bdfd
$if[$message[1]==]
  $sendMessage[❌ Correct usage: $commandTrigger <parameter>
  Type `!help $commandName` for more information.]
  $stop
$endif
```

### Usage statistics (via storage)

```bdfd
$var[count;$getVar[usage_$commandName]]
$var[count;$calculate[$var[count]+1]]
$setVar[usage_$commandName;$var[count]]
$log[📊 $commandName used $var[count] times]
```

### Detection for specific behavior

```bdfd
$if[$commandName==help]
  $sendMessage[📚 Here is the command list...]
$elseif[$commandName==ping]
  $sendMessage[🏓 Pong! Latency: $ping ms]
$else
  $sendMessage[Command $commandName executed.]
$endif
```

## Notes

- `$commandName` returns the internal name, not the trigger (prefix).
- For the type of invocation, use `$commandType`.
- For the folder, use `$commandFolder`.
