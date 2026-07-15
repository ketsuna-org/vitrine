---
layout: doc
title: $slashOption
translation_key: docs
category: "Entity Info"
function_name: slashOption
syntax: $slashOption
description: Returns the value of a slash command option by name or positional index.
---

# $slashOption

`$slashOption` retrieves the value of a **slash command option** while a slash interaction is executing. Use it in hybrid commands that also support prefix invocations.

## Syntax

### Named option

```
$slashOption[optionName]
```

### Positional option (1-based index)

```
$slashOption[1]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:--------:|
| `optionName` or `index` | Option name as defined in the slash command builder, or a 1-based positional index | Yes |

## Return value

- **Type**: String (or type-appropriate value for the option)
- Empty string if the option was not provided or the command is not a slash command.

## Description

When [$isSlash](/docs/isslash/) or [$commandType](/docs/commandtype/) is `slash`, options are passed by Discord as structured fields rather than raw message text. `$slashOption` reads those values.

Pair it with `$message[n]` in hybrid commands so prefix and slash modes share the same processing logic.

## Examples

### Hybrid command arguments

```bdfd
$if[$isSlash==true]
  $var[args;$slashOption[1]]
$else
  $var[args;$message[1]]
$endif

$sendMessage[You provided: $var[args]]
```

### Named slash options

```bdfd
$if[$commandType==slash]
  $var[target;$slashOption[target]]
  $var[reason;$slashOption[reason]]
$else
  $var[target;$message[1]]
  $var[reason;$message[2]]
$endif
```

### Slash command logging

```bdfd
$if[$isSlash==true]
  $log[Slash /$commandName — option 1: $slashOption[1]]
$endif
```

## Related functions

- [$isSlash](/docs/isslash/) — detect slash vs prefix invocation
- [$commandType](/docs/commandtype/) — returns `slash` or `prefix`
- [$slashID](/docs/slashid/) — Discord snowflake of the slash command
- [$args](/docs/args/) — prefix command arguments

## Notes

- Only meaningful when the command runs as a slash interaction.
- Option names must match the names configured in the Bot Creator slash command editor.
- For subcommands, use the subcommand option names as defined in the command tree.
