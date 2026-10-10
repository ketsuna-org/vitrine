---
layout: doc
title: $getCooldown[]
translation_key: docs
category: "Control Flow"
function_name: getCooldown
syntax: $getCooldown[type]
description: Returns the remaining cooldown time in whole seconds (rounded up) for the current command, for the given scope (normal, server or global).
---
$getCooldown retrieves the remaining cooldown time so you can display it to users or use it in conditional logic. The return value is always in **seconds**, as a whole number rounded up, regardless of the original duration format.

## Return Value

- If a cooldown is active → returns the remaining time in whole seconds, rounded up (e.g., `"45"`, `"1"` for 0.1 s left).
- If no cooldown is active → returns `"0"`.
- The function only reads the stored cooldown of the current command; it does not start or extend one.
- The value is always a string but can be used in numeric comparisons.

## Type Parameter

The `type` parameter is **required** (a bare `$getCooldown` is refused with "Invalid argument count") and selects the cooldown scope. It must be written exactly in lowercase:

| Type value | Queries |
|------------|---------|
| `normal` | Per-user cooldown in the current server (`$cooldown`) |
| `server` | Per-server cooldown (`$serverCooldown`) |
| `global` | Per-user cooldown shared by all servers (`$globalCooldown`) |

Any other value (including `Normal` or an empty value) raises `Cooldown type must be normal, server or global.` Like the cooldown functions, `normal` and `server` need the ID of a server (`Invalid Discord ID.` otherwise) and all types need a command ID (`Cooldown requires a bot and command ID.`).

## Usage in Error Messages

The most common use of `$getCooldown` is inside the cooldown error message itself. The error message argument of `$cooldown` is only evaluated after the cooldown has been checked and found active, so `$getCooldown[normal]` can be used in it:

```text
$cooldown[30s;Try again in $getCooldown[normal] seconds.]
```

When the cooldown is active, `$getCooldown[normal]` returns the remaining time and embeds it in the error message. The `%time%` placeholders of the cooldown functions are also available.

## Conditional Logic

You can use `$getCooldown` in `$if` conditions or comparisons to adjust behavior based on the remaining time.

## Examples

### Displaying Remaining Cooldown Time

```bdfd
$cooldown[1h;Command is on cooldown! Time remaining: **$getCooldown[normal]** seconds.]
$title[Daily Work Completed]
$description[You worked hard and earned **250 coins**! Run this again in 1 hour.]
$color[#57F287]
```
