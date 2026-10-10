---
layout: doc
title: $enabled
translation_key: docs
category: "Variables"
function_name: enabled
syntax: $enabled[yes/no;(errorMessage)]
description: Stops the command when its first argument is no (or false), optionally replacing the output with an error message. It does not disable the command permanently.
---
# $enabled

The `$enabled[]` function is a **guard**: when its first argument is `no` (or `false`), it stops the rest of the command, and the optional error message becomes the output of the command. When it is `yes` (or `true`), nothing happens and the command continues.

## Syntax

```
$enabled[yes/no;(errorMessage)]
```

## Parameters

| Parameter | Description |
|---|---|
| `yes/no` | Required. `yes` or `true` lets the command continue; `no` or `false` stops it. Case-insensitive, surrounding spaces are ignored. Any other value (including an empty value) raises the error `Enabled must be yes or no.` |
| `errorMessage` | Optional - Text used as the output of the command when it is stopped. If omitted, the output is empty. |

## Return value

None (empty string).

## Behavior

- `$enabled[no]` stops the command at this point: the code after it is not executed and any output built before it is discarded. The error message (if any) is the output.
- `$enabled[yes]` does nothing.
- The function does not change anything stored for the command: it does not hide, disable or re-enable it, and a later execution runs the command again from the start. It is evaluated each time the command runs, so it can be combined with variables or conditions.

## Examples

### Stop with a message

```bdfd
$enabled[no;This command is currently disabled.]
$sendMessage[This line is never reached.]
```

### Feature switch stored in a variable

```bdfd
$enabled[$getVar[featureEnabled];❌ This feature is turned off.]
$sendMessage[The feature is on.]
```

### Conditional guard

```bdfd
$if[$getVar[maintenance]==true]
  $enabled[no;🔧 Maintenance in progress.]
$endif
$sendMessage[Normal behavior.]
```

## Notes

- A bare `$enabled` without arguments is invalid.
- For the feature-switch example, the variable must hold `yes`, `no`, `true` or `false`; an unset variable returns an empty string, which raises an error.
- For a guard based on a condition, `$onlyIf[]` is also available.
