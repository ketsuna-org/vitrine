---
description: Sets a cooldown on the command that is per user and shared by all servers.
layout: doc
translation_key: docs
category: "Cooldown"
---

# $globalCooldown

Enforces a cooldown on the command that is **per user and shared by all servers**: when a user triggers it, that user must wait before running the command again, in any server.

## Syntax

```text
$globalCooldown[duration;errorMessage]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `duration` | The cooldown duration (see below). Zero or unreadable values raise `Invalid cooldown duration.` | Yes |
| `errorMessage` | Message sent when the cooldown is active. The argument is required; if it is left empty, the error `Command is on cooldown.` is raised instead. | Yes |

## Duration Format

A number followed by a unit: `ms`, `s`, `m`, `h`, `d`, `w`, `y` (or the full names `seconds`, `minutes`, ...), for example `10s`, `5m`, `1h`, `2d`. A plain number is read as seconds, and units can be combined (`2m30s`).

## Description

The cooldown key of `$globalCooldown` is the bot, the command and the **user**: the server is not part of it. So the cooldown follows a user from server to server, but it does **not** lock the command for other users.

**Scope comparison:**

| Function | Cooldown key (per command) |
|----------|----------------------------|
| `$cooldown[duration;msg]` | user + server |
| `$serverCooldown[duration;msg]` | server |
| `$globalCooldown[duration;msg]` | user (all servers) |

## How It Works

1. When the command runs, `$globalCooldown` checks whether a cooldown is active for the user and the command.
2. If **no cooldown is active** → a new cooldown is started and execution continues.
3. If **a cooldown is active** → the script stops, the response written so far is discarded and `errorMessage` is sent as the response. No further code runs.

The error message accepts the placeholders `%time%`, `%time-d%`, `%time-h%`, `%time-m%` and `%time-s%`; see `$cooldown`. It needs a command ID, but not a server ID.

## Place at the Top

Place `$globalCooldown` at the **top** of your script, before any side effects, so that nothing is done when the cooldown is active.

## Examples

### Basic cooldown

```bdfd
$globalCooldown[1h;This command is on cooldown.]
This command can only be used once per hour.
```

### Displaying the remaining time

```bdfd
$globalCooldown[10m;Cooldown! Try again in $getCooldown[global] seconds.]
Processing...
```

### With the time placeholder

```bdfd
$globalCooldown[30m;Please wait %time%.]
Command executed!
```

### Combined with other checks

```bdfd
$globalCooldown[30s;Cooldown active!]
$cooldown[10s;You're on cooldown!]
$onlyIf[$message!=;Please provide a message.]
Message received: $message
```

## Notes

- For per-server restrictions, use `$serverCooldown`; for per-user restrictions in each server, use `$cooldown`.
- Use `$getCooldown[global]` to retrieve the remaining time in seconds.
