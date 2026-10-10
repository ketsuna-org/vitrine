---
layout: doc
title: $debug
translation_key: docs
category: "Flags & Debug"
function_name: debug
syntax: $debug[value]
description: Accepts exactly one argument and returns an empty string; in this engine it has no other effect.
---
# $debug

The `$debug[]` function takes exactly one argument. In this engine its handler ignores the argument and returns an empty string: it does not enable any debug mode.

## Syntax

```
$debug[value]
```

## Parameters

| Parameter | Description |
|---|---|
| `value` | Required (exactly one argument). Ignored by the engine. |

## Return value

An empty string.

## Behavior

- The engine does not produce any diagnostic output for this function.
- `$debug` without brackets is refused ("Invalid argument count"): one argument is required.

## Examples

### Simple debug

```bdfd
$debug[on]
$var[result;$calculate[2+2]]
$sendMessage[Result: $var[result]]
```

### Conditional debug

```bdfd
$if[$message[1]==--debug]
  $debug[on]
$endif
$sendMessage[Debug argument received (no effect).]
```

### Debug in a complex command

```bdfd
$debug[on]
$var[userData;$getUserVar[xp;$authorID]]
$sendMessage[XP: $var[userData]]
```

## Notes

- For custom logs, use `$log[]` (one argument, forwarded to the engine's log callback).
