---
layout: doc
title: $cooldown[] / $globalCooldown[] / $serverCooldown[]
translation_key: docs
category: "Control Flow"
function_name: cooldown
syntax: $cooldown[duration;errorMessage]
description: "Enforces a cooldown on command execution. Available in three scopes: per-user ($cooldown), per-guild ($serverCooldown), and global ($globalCooldown)."
---
The cooldown family prevents command spam by enforcing a waiting period between successive uses. BDFD provides three variants, each targeting a different scope of enforcement.

## Cooldown Variants

| Function | Scope | Description |
|----------|-------|-------------|
| `$cooldown[duration;msg]` | **User** | One cooldown per user. User A on cooldown does not prevent User B from using the command. |
| `$serverCooldown[duration;msg]` | **Guild** | One cooldown per server (guild). If any user triggers it, all users in that server must wait. |
| `$globalCooldown[duration;msg]` | **Global** | One cooldown across all servers and all users. The entire bot is locked out until the cooldown expires. |

## Duration Format

Durations use a human-readable format. Each unit is a number followed by a letter:

| Unit | Letter | Example |
|------|--------|---------|
| Seconds | `s` | `10s` = 10 seconds |
| Minutes | `m` | `5m` = 5 minutes |
| Hours | `h` | `1h` = 1 hour |
| Days | `d` | `2d` = 2 days |
| Milliseconds | `ms` | `500ms` = 500 milliseconds |
| Weeks | `w` | `1w` = 1 week |
| Years | `y` | `1y` = 1 year |

Full unit names (`seconds`, `minutes`, `hours`, `days`...) are also accepted, and a plain number is read as seconds. You can combine units: `2m30s` = 2 minutes and 30 seconds. A duration that cannot be read, or that is zero, raises the error `Invalid cooldown duration.`

Both parameters are required: the call is refused with fewer than two arguments.

## How It Works

1. When the command runs, the function checks if a cooldown is active for the relevant scope (user/guild/global).
2. If **no cooldown is active** → a new cooldown is set for the specified duration, and execution continues normally.
3. If **a cooldown is active** → `errorMessage` is sent, and execution **stops immediately**. No further code runs.

The cooldown is tracked per command (and per user for `$cooldown`, per server for `$serverCooldown`, per bot for `$globalCooldown`).

## Error Message

The second parameter is required:

- **With message**: `$cooldown[10s;⏳ Please wait 10 seconds.]` — sends the message and stops.
- **Empty message**: `$cooldown[10s;]` — when the cooldown is active, the function raises the error `Command is on cooldown.` instead of sending a message.

The message can contain the placeholders `%time%` (remaining time in the most suitable unit), `%time-d%`, `%time-h%`, `%time-m%` and `%time-s%`. The unit labels can be changed with `$changeCooldownTime`. `$getCooldown[type]` (`normal`, `server` or `global`) returns the remaining time in seconds.

## Placement

Like `$onlyIf` and `$argsCheck`, place cooldown functions at the **top** of your command, before any side effects (database writes, API calls, etc.). This ensures the cooldown check happens before any work is done.

## Example: Full Command with Cooldown

```bdfd
$cooldown[30s;⏳ Cooldown is active. Try again in %time-s%.]
$onlyIf[$message!=;❌ You must provide a message.]
Processing your message: $message
$sendMessage[✅ Processing complete!]
```
