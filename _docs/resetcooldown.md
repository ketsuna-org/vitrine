---
layout: doc
title: $resetCooldown
translation_key: docs
category: "Cooldown"
function_name: resetCooldown
syntax: $resetCooldown[(normal|server|global)]
description: Hands back a cooldown claimed with $cooldown, $serverCooldown or $globalCooldown. Not in BDFD.
---

# $resetCooldown

`$resetCooldown` **releases a cooldown** previously claimed by `$cooldown`, `$serverCooldown` or `$globalCooldown`, for example when the rest of the script fails after the cooldown was taken. This function does not exist in BDFD.

## Syntax

```
$resetCooldown[(normal|server|global)]
```

## Parameters

| Parameter | Description |
|---|---|
| `type` | Optional. `normal` (default, matches `$cooldown`), `server` (matches `$serverCooldown`) or `global` (matches `$globalCooldown`). Any other value raises "Cooldown type must be normal, server or global.". |

## Return value

- An empty string.

## Examples

### Give the cooldown back on failure

```bdfd
$cooldown[30s;Wait %time% before retrying.]
$if[$message[1]==]
  $resetCooldown
  Usage: !cmd value
$endif
```

### Global cooldown

```bdfd
$resetCooldown[global]
```
