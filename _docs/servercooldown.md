---
description: Sets a per-server cooldown for a command.
layout: doc
translation_key: docs
category: "Cooldown"
---

# $serverCooldown

Enforces a per-server (guild) cooldown on the command. When triggered, all users in that server must wait until the cooldown expires before anyone can run the command again in that server.

## Syntax

```text
$serverCooldown[duration;errorMessage]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `duration` | The cooldown duration (see below). Zero or unreadable values raise `Invalid cooldown duration.` | Yes |
| `errorMessage` | Message sent when the cooldown is active. The argument is required; if it is left empty, the error `Command is on cooldown.` is raised instead. | Yes |

## Duration Format

A number followed by a unit: `ms`, `s`, `m`, `h`, `d`, `w`, `y` (or the full names `seconds`, `minutes`, ...), for example `10s`, `5m`, `1h`, `2d`. A plain number is read as seconds, and units can be combined (`2m30s`).

## Description

`$serverCooldown` locks the command for all users **within a single server (guild)** when any user in that server triggers it. Users in other servers are not affected. The cooldown key is the bot, the command and the server. The function needs the ID of a server: without one (a direct message) it fails with `Invalid Discord ID.`

**Scope comparison:**

| Function | Cooldown key (per command) |
|----------|----------------------------|
| `$cooldown[duration;msg]` | user + server |
| `$serverCooldown[duration;msg]` | server |
| `$globalCooldown[duration;msg]` | user (all servers) |

## How It Works

1. When the command runs, `$serverCooldown` checks whether a cooldown is active for the current server and command.
2. If **no cooldown is active** → a new server cooldown is started and execution continues.
3. If **a cooldown is active** → the script stops, the response written so far is discarded and `errorMessage` is sent as the response. No further code runs.

The error message accepts the placeholders `%time%`, `%time-d%`, `%time-h%`, `%time-m%` and `%time-s%`; see `$cooldown`.

## Place at the Top

Place `$serverCooldown` at the **top** of your script, before any side effects, so that nothing is done when the cooldown is active.

## Examples

### Basic server cooldown

```bdfd
$serverCooldown[10s;Please wait before using this command again.]
Command executed!
```

### Displaying the remaining time

```bdfd
$serverCooldown[1m;Server cooldown! Try again in $getCooldown[server] seconds.]
Done!
```

### Server-wide daily command

```bdfd
$serverCooldown[24h;This command can only be used once per day in this server!]
Daily reward claimed for this server!
```

### Combined with a user cooldown

```bdfd
$cooldown[30s;You must wait before using this command again.]
$serverCooldown[10s;This command is on server cooldown.]
Action complete!
```

## Notes

- The cooldown is **per server**: different servers have independent cooldowns.
- For restrictions that follow a user across all servers, use `$globalCooldown`; for per-user restrictions in each server, use `$cooldown`.
- Use `$getCooldown[server]` to retrieve the remaining server cooldown time in seconds.
