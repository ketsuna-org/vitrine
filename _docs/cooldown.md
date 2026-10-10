---
layout: doc
title: $cooldown[] / $globalCooldown[] / $serverCooldown[]
translation_key: docs
category: "Control Flow"
function_name: cooldown
syntax: $cooldown[duration;errorMessage]
description: "Enforces a cooldown on command execution. Three variants: $cooldown (per user and server), $serverCooldown (per server) and $globalCooldown (per user, all servers)."
---

The cooldown family prevents command spam by enforcing a waiting period between successive uses. The engine provides three variants, with different keys. All of them are tracked **per command** (the command ID of the running command).

## Cooldown Variants

| Function | Cooldown key (per command) | Meaning |
|----------|----------------------------|---------|
| `$cooldown` | user + server | One cooldown per user in each server. User A being on cooldown does not prevent user B. |
| `$serverCooldown` | server | One cooldown per server: any user who triggers it makes it wait for everybody in that server. |
| `$globalCooldown` | user | One cooldown per user, shared by **all servers** (the server is not part of its key). It does **not** lock the whole bot. |

`$cooldown` and `$serverCooldown` need the ID of the server: in a context without a server (a direct message) they fail with `Invalid Discord ID.` `$globalCooldown` does not need one. All three need a command ID (`Cooldown requires a bot and command ID.` otherwise).

## Syntax

```text
$cooldown[duration;errorMessage]
$serverCooldown[duration;errorMessage]
$globalCooldown[duration;errorMessage]
```

Both parameters are required: the call is refused with fewer than two arguments.

## Duration Format

Durations use a human-readable format. Each unit is a number followed by a unit:

| Unit | Letter | Example |
|------|--------|---------|
| Milliseconds | `ms` | `500ms` = 500 milliseconds |
| Seconds | `s` | `10s` = 10 seconds |
| Minutes | `m` | `5m` = 5 minutes |
| Hours | `h` | `1h` = 1 hour |
| Days | `d` | `2d` = 2 days |
| Weeks | `w` | `1w` = 1 week |
| Years | `y` | `1y` = 1 year |

Full unit names (`seconds`, `minutes`, `hours`, `days`...) are also accepted, and a plain number is read as seconds. You can combine units: `2m30s` = 2 minutes and 30 seconds. A duration that cannot be read, or that is zero, raises the error `Invalid cooldown duration.`

## How It Works

1. When the function runs, it checks whether a cooldown is active for its key.
2. If **no cooldown is active** → a new cooldown is started for the specified duration, and execution continues normally. Calling the function again while it is active does not extend it.
3. If **a cooldown is active** → the script stops. The response written so far is discarded and `errorMessage` is sent as the response. No further code runs.

The cooldown starts as soon as the function succeeds: if a later line of the script fails, the cooldown stays active.

## Error Message

The second parameter is required and is only evaluated when the cooldown is active:

- **With message**: `$cooldown[10s;Please wait 10 seconds.]` — sends the message and stops.
- **Empty message**: `$cooldown[10s;]` — when the cooldown is active, the function raises the error `Command is on cooldown.` instead of sending a message.

The message can contain the placeholders `%time%` (remaining time in the largest unit that is at least 1, or in seconds), `%time-d%`, `%time-h%`, `%time-m%` and `%time-s%`. Amounts are rounded to one decimal place and followed by a unit label (for example `1.5 Minutes`, `90 Seconds`). The unit labels can be changed with `$changeCooldownTime`. `$getCooldown[type]` (`normal`, `server` or `global`) returns the remaining time in seconds.

## Placement

Like `$onlyIf` and `$argsCheck`, place cooldown functions at the **top** of your script, before any side effects (database writes, API calls, etc.), so that nothing is done when the cooldown is active.

## Example: Full Command with Cooldown

```bdfd
$cooldown[30s;Cooldown is active. Try again in %time-s%.]
$onlyIf[$message!=;You must provide a message.]
Processing your message: $message
```

## Example: Two scopes together

```bdfd
$serverCooldown[10s;This server must wait %time%.]
$cooldown[1m;You must wait %time%.]
Action complete!
```
