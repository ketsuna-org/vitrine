---
layout: doc
title: $debug
translation_key: docs
category: "Flags & Debug"
function_name: debug
syntax: $debug
description: Enables debug mode for the current command. Displays diagnostic information in the console or BDFD logs.
---
# $debug

The `$debug` function **enables debug mode** for the currently executing command.

## Syntax

```
$debug
```

## Parameters

None.

## Return value

None.

## Behavior

- Once enabled, BDFD displays additional diagnostic information.
- Helps to trace errors, variable values, and execution flow.
- Debug mode is automatically disabled at the end of the command.

## Examples

### Simple debug

```bdfd
$debug
$let[result;$calculate[2+2]]
$sendMessage[Result: $result]
```

### Conditional debug

```bdfd
$if[$message[1]==--debug]
  $debug
$endif
$sendMessage[Debug enabled for this execution.]
```

### Debug in a complex command

```bdfd
$debug
$var[userData;$getGlobalUserVar[$authorID;xp]]
$sendMessage[XP: $userData]
```

## Notes

- Debugging consumes logging resources; avoid enabling it in production.
- Combine with `$log[]` for custom logs.
- Useful for troubleshooting unexpected behaviors.
