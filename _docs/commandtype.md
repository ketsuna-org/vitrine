---
layout: doc
title: $commandType
translation_key: docs
category: "Entity Info"
function_name: commandType
syntax: $commandType
description: Returns how the current command was invoked, taken from the execution context (chatInput, user or message for application commands, text otherwise).
---

# $commandType

The `$commandType` function **returns the type of invocation** of the command currently being executed.

## Syntax

```
$commandType
```

## Parameters

None (passing one is an error).

## Return value

- **Type**: String
- For a Discord application command, the type of the command: `chatInput` (a slash command), `user` (user context menu) or `message` (message context menu). It comes from the context variable `commandType` (or `command.type`) set when the interaction is received.
- `text` when the context has no command type and no interaction (for example a command typed with the bot prefix).
- `slash` only in the unusual case where the context has an interaction ID but no command type.

## Behavior

- A slash command therefore gives `chatInput`, **not** `slash`; a prefix command gives `text`, **not** `prefix`.
- To test whether the command was started by a slash command, `$isSlash` is the dedicated function.

## Examples

### Adaptive response

```bdfd
$if[$commandType==chatInput]
  $ephemeral
  ✅ Operation successful!
$else
  $sendMessage[✅ Operation successful!]
$endif
```

### Differentiated log

```bdfd
$if[$commandType==chatInput]
  $log[🔹 SLASH /$commandName by $username]
$else
  $log[🔸 TEXT $commandTrigger by $username]
$endif
```

### Contextual help

```bdfd
$title[⚙️ Command details]
$addField[Name;$commandName;yes]
$addField[Trigger;$commandTrigger;yes]
$var[kind;🔸 Text]
$if[$commandType==chatInput]
  $var[kind;🔹 Slash]
$endif
$addField[Type;$var[kind];yes]
$addField[Folder;$commandFolder;yes]
$footer[Language: $scriptLanguage]
```

### Hybrid command with arguments

```bdfd
$c[Retrieve arguments based on the type]
$if[$commandType==chatInput]
  $var[arg1;((opts.target))]
  $var[arg2;((opts.reason))]
$else
  $var[arg1;$message[1]]
  $var[arg2;$message[2]]
$endif

🎯 Target: $var[arg1] | Reason: $var[arg2]
```

## Related functions

- [$isSlash](/docs/isslash/) — check if the command was triggered via slash command
- [Execution model](/docs/execution-model/) — options variables and command execution

## Notes

- Possible values: `chatInput`, `user`, `message` (application commands), `text` (no interaction), or `slash` (interaction without command type).
- For a simple boolean check, use `$isSlash`, which reads a different context value (`interaction.isSlash`).
- The value describes the invocation, not the configuration of the command: a hybrid command gives `chatInput` when used as a slash command and `text` when typed with the prefix.
