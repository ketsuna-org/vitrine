---
layout: doc
title: $isSlash
translation_key: docs
category: "Math & Text"
function_name: isSlash
syntax: $isSlash
description: Checks if the command was triggered via a slash command.
---

# $isSlash

The function `$isSlash` **checks if the current command was triggered via a slash command** (application command) rather than a classic prefix command.

## Syntax

```
$isSlash
```

## Parameters

None.

## Return Value

- **Type**: Boolean
- `"true"` if the command context is flagged as a slash (application command) interaction.
- `"false"` otherwise, including when the flag is absent.

## Behavior

- Allows adapting behavior based on the invocation mode.
- It reads the `interaction.isSlash` value of the execution context: the result is `true` only when that value is exactly `true`.
- No parameters: `$isSlash[...]` with an argument is refused ("Invalid argument count").

## Examples

### Adaptive Response

```bdfd
$if[$isSlash==true]
  $ephemeral
  $sendMessage[✅ Action completed successfully!]
$else
  $sendMessage[✅ Action completed successfully!]
$endif
```

### Diagnostic Log

```bdfd
$if[$isSlash==true]
  $log[Command /$commandName executed by $userName]
$else
  $log[Command $commandTrigger executed by $userName]
$endif
```

### Info Message

```bdfd
$if[$isSlash==true]
  $var[type;Slash]
$else
  $var[type;Prefix]
$endif
$title[ℹ️ Command Information]
$description[
**Name:** $commandName
**Type:** $var[type]
**Folder:** $commandFolder
]
$color[#5865F2]
```

### Hybrid Command

```bdfd
$c[This command works in prefix and slash mode]
$if[$isSlash==true]
  $var[args;((opts.input))]
$else
  $var[args;$message[1]]
$endif

$c[Common processing]
You provided: $var[args]
```

## Related functions

- [$ephemeral](/docs/ephemeral/) — make an interaction response visible only to the command caller
- [Execution model](/docs/execution-model/) — understand implicit slash replies and option variables

## Notes

- `$isSlash` takes no parameters.
- To get the precise command type, use `$commandType`.
- `$isSlash` is evaluated in the context of the currently executing command.
- Slash options are available as `((opts.name))` variables; `$message[name]` also reads a slash option by name when the command is a slash command.
