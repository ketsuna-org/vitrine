---
layout: doc
translation_key: docs
category: "Cooldown"
---

# $serverCooldown

Enforces a per-server (guild) cooldown on command execution. When triggered, all users in that server must wait until the cooldown expires before anyone can run the command again in that server.

## Syntax

```
$serverCooldown[duration;(errorMessage)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `duration` | The cooldown duration | Yes |
| `errorMessage` | Custom error message shown when the cooldown is active | No |

## Duration Format

| Unit | Letter | Example |
|------|--------|---------|
| Seconds | `s` | `10s` = 10 seconds |
| Minutes | `m` | `5m` = 5 minutes |
| Hours | `h` | `1h` = 1 hour |
| Days | `d` | `2d` = 2 days |

## Description

`$serverCooldown` locks the command for all users **within a single server (guild)** when any user in that server triggers it. Users in other servers are not affected.

**Scope comparison:**

| Function | Scope | Behavior |
|----------|-------|----------|
| `$cooldown[duration;(msg)]` | **User** | One cooldown per user |
| `$serverCooldown[duration;(msg)]` | **Guild** | One cooldown per server |
| `$globalCooldown[duration;(msg)]` | **Global** | One cooldown for the entire bot |

## How It Works

1. When the command runs, `$serverCooldown` checks if a cooldown is active for the current server.
2. If **no cooldown is active** → a new server cooldown is set and execution continues.
3. If **a cooldown is active** → the optional `errorMessage` is sent, and execution **stops immediately**. No further code runs.

## Place at the Top

Always place `$serverCooldown` at the **top** of your command, before any side effects (database writes, API calls, etc.). This ensures the cooldown check happens before any work is done.

## Examples

### Basic Server Cooldown

```
$serverCooldown[10s]
$sendMessage[Command executed!]
```

### With Custom Error Message

```
$serverCooldown[5m;⏳ This command is on cooldown for this server. Please wait!]
$sendMessage[Processing...]
```

### Displaying Remaining Time

```
$serverCooldown[1m;⏳ Server cooldown! Try again in $getCooldown[server] seconds.]
$sendMessage[Done!]
```

### Server-Wide Daily Command

```
$serverCooldown[24h;⏳ This command can only be used once per day in this server!]
$sendMessage[Daily reward claimed for this server!]
```

### Combined with User Cooldown

```
$cooldown[30s;⏳ You must wait before using this command again.]
$serverCooldown[10s;⏳ This command is on server cooldown.]
$sendMessage[Action complete!]
```

## Notes

- Cooldown is **per-server** (guild) — different servers have independent cooldowns.
- For bot-wide restrictions across all servers, use `$globalCooldown` instead.
- For per-user restrictions, use `$cooldown` instead.
- Use `$getCooldown[server]` to retrieve the remaining server cooldown time in seconds.
