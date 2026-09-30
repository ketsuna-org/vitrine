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
- `true` if the command was invoked via `/command`.
- `false` if it was invoked via prefix (`!command`, `?command`, etc.).

## Behavior

- Allows adapting behavior based on the invocation mode.
- Useful for sending ephemeral responses in slash mode (`$sendEphemeral[]`).
- No parameters: current command context only.

## Examples

### Adaptive Response

```bdfd
$if[$isSlash==true]
  $sendEphemeral[✅ Action completed successfully!]
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
$var[type;$if[$isSlash==true]Slash$elsePrefix$endif]
$title[ℹ️ Command Information]
$description[
**Name:** $commandName
**Type:** $var[type]
**Folder:** $commandFolder
]
$color[$if[$isSlash==true]#5865F2$else#57F287$endif]
$sendMessage[]
```

### Hybrid Command

```bdfd
;; This command works in prefix and slash mode
$if[$isSlash==true]
  $var[args;((opts.input))]
$else
  $var[args;$message[1]]
$endif

;; Common processing
You provided: $var[args]
```

## Related functions

- [$ephemeral](/docs/ephemeral/) — make an interaction response visible only to the command caller
- [Execution model](/docs/execution-model/) — understand implicit slash replies and option variables

## Notes

- `$isSlash` takes no parameters.
- To get the precise command type, use `$commandType`.
- Ephemeral responses (`$sendEphemeral[]`) only work in slash mode.
- `$isSlash` is evaluated in the context of the currently executing command.
