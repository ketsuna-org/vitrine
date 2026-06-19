---
layout: doc
title: $enabled
translation_key: docs
category: "Commands"
function_name: enabled
syntax: $enabled[yes/no]
description: Enables or disables a command. When disabled (no), the command is no longer executable by users.
---
# $enabled

The `$enabled[]` function **enables or disables** the command in which it is placed.

## Syntax

```
$enabled[yes/no]
```

## Parameters

| Parameter | Description |
|---|---|
| `yes/no` | `yes` to enable the command, `no` to disable it. |

## Return value

None.

## Behavior

- `$enabled[no]` makes the command invisible and inexecutable.
- `$enabled[yes]` reactivates it.
- Can be combined with conditions for conditional activation.

## Examples

### Disable temporarily

```bdfd
$enabled[no]
```

### Conditional activation by role

```bdfd
$if[$hasRole[$authorID;Admin]==true]
  $enabled[yes]
$else
  $enabled[no]
$endif
```

### Maintenance mode command

```bdfd
$var[maintenance;$getVar[maintenance]]
$if[$var[maintenance]==true]
  $if[$hasRole[$authorID;Staff]==true]
    $enabled[yes]
  $else
    $enabled[no]
  $endif
$else
  $enabled[yes]
$endif
```

## Notes

- A disabled command does not appear in command suggestions.
- Unlike `$onlyIf[]` which keeps the command visible but blocks execution, `$enabled[no]` hides it completely.
- Useful for commands in maintenance or seasonal commands.
