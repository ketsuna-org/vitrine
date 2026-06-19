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

The `$commandName` function **returns the name of the command currently being executed**, as defined in the BDFD editor.

## Syntax

```
$commandName
```

## Parameters

None.

## Return value

- **Type**: String
- The name of the command (e.g., `help`, `ban`, `ping`).

## Behavior

- Returns the internal name of the command, not the trigger.
- The name is the one set in the BDFD console.
- Useful for logs, contextual help, and detection.

## Examples

### Execution log

```bdfd
$log[📌 $userName ($authorID) executed /$commandName in #$channelName on $serverName]
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
$sendMessage[]
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
$var[count;$math[$var[count]+1]]
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
- For slash commands, the name corresponds to the application command name.
- For the type (prefix/slash), use `$commandType`.
- For the folder, use `$commandFolder`.
