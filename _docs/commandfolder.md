---
layout: doc
title: $commandFolder
translation_key: docs
category: "Entity Info"
function_name: commandFolder
syntax: $commandFolder
description: Returns the name of the folder containing the command currently being executed.
---

# $commandFolder

The `$commandFolder` function **returns the name of the folder** stored with the command that is currently being executed.

## Syntax

```
$commandFolder
```

## Parameters

None (passing one is an error).

## Return value

- **Type**: String
- The `folder` value of the stored command (e.g., `Moderation`, `Fun`, `Admin`, `Utils`), or an empty string if the command has no folder.
- If the execution has no command metadata (for example it was not started by a command), the error `Invocation metadata command.folder is unavailable.` is raised.

## Behavior

- The value is supplied by the command that starts the execution; no request is made to Discord.
- Useful for organizing logs, help, or permissions.

## Examples

### Organized log

```bdfd
$log[📂 [$commandFolder] $userName executed $commandName]
```

### Contextual help

```bdfd
$title[📖 $commandName]
$addField[📂 Category;$commandFolder;yes]
$addField[⚡ Type;$commandType;yes]
$addField[🔤 Trigger;$commandTrigger;yes]
$description[
Complete help for the command...
]
```

### Folder-based permissions

```bdfd
$if[$commandFolder==Admin]
  $if[$hasRole[$authorID;123456789012345678]==false]
    $ephemeral
    $sendMessage[❌ Commands in the Admin folder are restricted.]
    $stop
  $endif
$endif

$c[Command executed normally]
$sendMessage[✅ Command executed.]
```

### Home page per folder

```bdfd
$if[$commandFolder==Moderation]
  $sendMessage[🛡️ **Moderation** - Server management commands.]
$elseif[$commandFolder==Fun]
  $sendMessage[🎮 **Fun** - Entertainment commands.]
$elseif[$commandFolder==Utils]
  $sendMessage[🔧 **Utility** - Useful commands.]
$else
  $sendMessage[📂 Folder: $commandFolder]
$endif
```

## Notes

- Empty string if the command is not in a folder.
