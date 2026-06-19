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

The `$commandFolder` function **returns the name of the folder** in which the current command is organized in the BDFD console.

## Syntax

```
$commandFolder
```

## Parameters

None.

## Return value

- **Type**: String
- The name of the folder (e.g., `Moderation`, `Fun`, `Admin`, `Utils`).

## Behavior

- Folders are defined in the BDFD command manager.
- Useful for organizing logs, help, or permissions.
- Returns an empty string if the command is at the root.

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
$sendMessage[]
```

### Folder-based permissions

```bdfd
$if[$commandFolder==Admin]
  $if[$hasRole[$roleID[Admin]]==false]
    $sendEphemeral[❌ Commands in the Admin folder are restricted.]
    $stop
  $endif
$endif

;; Command executed normally
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

- The name of the folder is the one set in the BDFD console.
- Useful for command structuring and permissions.
- Empty string if the command is not in a folder.
