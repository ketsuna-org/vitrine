---
layout: doc
title: $changeCooldownTime[]
translation_key: docs
category: "Control Flow"
function_name: changeCooldownTime
syntax: $changeCooldownTime[duration]
description: Modifies the remaining duration of the currently active cooldown. Can be used to extend or reduce an existing cooldown.
---
$changeCooldownTime lets you dynamically modify the remaining time of an active cooldown. This is useful for penalty systems, admin overrides, or adaptive rate limiting where the cooldown duration depends on user behavior.

## How It Works

1. A cooldown must already be active (set by `$cooldown`, `$serverCooldown`, or `$globalCooldown` earlier in the same command).
2. Calling `$changeCooldownTime` replaces the **remaining** time — not the total original duration.
3. The new duration is applied immediately.

## Important Notes

- **Must be called after a cooldown is set**. If no cooldown is active, calling `$changeCooldownTime` has no meaningful effect.
- **Replaces the remaining time**, not the original duration. For example, if a 60s cooldown has 45s left, `$changeCooldownTime[10s]` sets it to 10s remaining (not adds 10s).
- **Works with all cooldown scopes**: modifies whichever cooldown was most recently set (user, server, or global).

## Common Use Cases

### Adaptive Rate Limiting

Increase the cooldown for users who trigger anti-spam rules:

```
$cooldown[30s]
$if[$messageLength>500]
$changeCooldownTime[5m]
$sendMessage[⚠️ Messages longs : cooldown étendu à 5 minutes.]
$endif
```

### Admin Bypass

Admins can reset their cooldown:

```
$cooldown[60s;⏳ Cooldown actif.]
$if[$hasPerms[$authorID;Administrator]]
$changeCooldownTime[1s]
$sendMessage[🔓 Cooldown contourné (admin).]
$endif
```

## Duration Format

Same format as `$cooldown`: `Xs` for seconds, `Xm` for minutes, `Xh` for hours, `Xd` for days, `Xms` for milliseconds. Combined formats like `2m30s` are also supported.
