---
description: Sets a cooldown shared across all servers for a command.
layout: doc
translation_key: docs
category: "Cooldown"
---

# $globalCooldown

Enforces a global cooldown on command execution across all servers and all users. When triggered, the entire bot is locked out of the command until the cooldown expires.

## Syntax

```
$globalCooldown[duration;(errorMessage)]
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

`$globalCooldown` locks the command for **all users across all servers** when any user triggers it. This is the most restrictive cooldown scope.

**Scope comparison:**

| Function | Scope | Behavior |
|----------|-------|----------|
| `$cooldown[duration;(msg)]` | **User** | One cooldown per user |
| `$serverCooldown[duration;(msg)]` | **Guild** | One cooldown per server |
| `$globalCooldown[duration;(msg)]` | **Global** | One cooldown for the entire bot |

## How It Works

1. When the command runs, `$globalCooldown` checks if a global cooldown is active.
2. If **no cooldown is active** → a new global cooldown is set and execution continues.
3. If **a cooldown is active** → the optional `errorMessage` is sent, and execution **stops immediately**. No further code runs.

## Place at the Top

Always place `$globalCooldown` at the **top** of your command, before any side effects (database writes, API calls, etc.). This ensures the cooldown check happens before any work is done.

## Examples

### Basic Global Cooldown

```
$globalCooldown[1h]
$sendMessage[This command can only be used once per hour globally.]
```

### With Custom Error Message

```
$globalCooldown[30m;⏳ This command is on global cooldown. Please wait.]
$sendMessage[Command executed!]
```

### Displaying Remaining Time

```
$globalCooldown[10m;⏳ Global cooldown! Try again in $getCooldown[global] seconds.]
$sendMessage[Processing...]
```

### Combined with Other Checks

```
$globalCooldown[30s;⏳ Global cooldown active!]
$cooldown[10s;⏳ You're on cooldown!]
$onlyIf[$message!=;❌ Please provide a message.]
$sendMessage[Message received: $message]
```

## Notes

- The global cooldown applies to **all servers** — use sparingly for commands that affect the entire bot.
- For per-server restrictions, use `$serverCooldown` instead.
- For per-user restrictions, use `$cooldown` instead.
- Use `$getCooldown[global]` to retrieve the remaining global cooldown time in seconds.
