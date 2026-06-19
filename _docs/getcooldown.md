---
layout: doc
title: $getCooldown[]
translation_key: docs
category: "Control Flow"
function_name: getCooldown
syntax: $getCooldown or $getCooldown[type]
description: Returns the remaining cooldown time in seconds for the current command. Can optionally specify the cooldown scope to query.
---
$getCooldown retrieves the remaining cooldown time so you can display it to users or use it in conditional logic. The return value is always in **seconds** (as a decimal string), regardless of the original duration format.

## Return Value

- If a cooldown is active → returns the remaining time in seconds (e.g., `"45"`, `"2.5"`, `"0.1"`).
- If no cooldown is active → returns `"0"`.
- The value is always a string but can be used in numeric comparisons.

## Type Parameter

The optional `type` parameter lets you query a specific cooldown scope:

| Type value | Queries |
|------------|---------|
| `"user"` | Per-user cooldown (`$cooldown`) |
| `"server"` | Per-guild cooldown (`$serverCooldown`) |
| `"global"` | Global cooldown (`$globalCooldown`) |

If no type is specified, `$getCooldown` returns the remaining time of the **cooldown that was most recently set** in the current command — or `"0"` if none was set.

## Usage in Error Messages

The most common use of `$getCooldown` is inside the cooldown error message itself. However, note that **when the cooldown triggers, execution stops before reaching the message**. The value of `$getCooldown` is resolved at the moment `$cooldown` evaluates, so it works:

```
$cooldown[30s;⏳ Try again in $getCooldown seconds.]
```

When the cooldown is active, `$getCooldown` returns the remaining time and embeds it in the error message.

## Conditional Logic

You can use `$getCooldown` in `$if` conditions to adjust behavior based on remaining time. For example, offering a reduced-cooldown path for premium users or applying progressive penalties.
