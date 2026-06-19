---
layout: doc
title: $commandTrigger
translation_key: docs
category: "Entity Info"
function_name: commandTrigger
syntax: $commandTrigger
description: Returns the trigger of the command currently being executed.
---

# $commandTrigger

The `$commandTrigger` function **returns the complete trigger** of the current command, including the prefix or the slash. For example, if the command `help` is triggered by `!help`, the returned trigger is `!help`.

## Syntax

```
$commandTrigger
```

## Parameters

None.

## Return value

- **Type**: String
- The complete trigger of the command (prefix + name, or `/name` for slash).

## Behavior

- For prefix commands: returns the prefix + name (e.g., `!help`, `?ban`).
- For slash commands: returns `/name` (e.g., `/help`).
- The prefix depends on the configuration of the bot.

## Examples

### Error message with usage

```bdfd
$if[$message[1]==]
  $sendMessage[❌ **Usage:** $commandTrigger <user> <reason>
  Example: $commandTrigger @user Spam]
  $stop
$endif
```

### Contextual help

```bdfd
$title[📖 Help: $commandName]
$description[
**Command:** $commandTrigger
**Type:** $commandType
**Folder:** $commandFolder

**Usage:**
`$commandTrigger <param1> [param2]`

**Example:**
`$commandTrigger value1 optional`
]
$sendMessage[]
```

### Detailed log

```bdfd
$log[📌 CMD | User: $username | Trigger: $commandTrigger | Name: $commandName | Type: $commandType | Server: $serverName]
```

### Information in the embed

```bdfd
$title[⚡ Execution]
$addField[Command;$commandName;yes]
$addField[Trigger;$commandTrigger;yes]
$addField[Type;$commandType;yes]
$addField[Author;$userName;yes]
$addField[Folder;$commandFolder;yes]
$footer[Executed on $formatDate[$dateStamp]]
$sendMessage[]
```

## Notes

- `$commandTrigger` includes the prefix (e.g., `!help`), unlike `$commandName` (which returns `help`).
- For the name without a prefix, use `$commandName`.
- To determine if it is a slash command, use `$isSlash` or `$commandType`.
- The prefix can be extracted using `$charAt[$commandTrigger;1]`.
