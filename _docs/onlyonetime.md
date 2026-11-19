---
layout: doc
title: $onlyOneTime
translation_key: docs
category: "Cooldown"
function_name: onlyOneTime
syntax: $onlyOneTime[script;user|server|global;(errorMessage)]
description: Runs a script only once per user, per server or for everybody. Later uses are refused. Not in BDFD.
---

# $onlyOneTime

`$onlyOneTime` **runs its script a single time**. The first time it is reached, the script runs and the claim is taken. Every later use is refused: the script stops and `errorMessage` is the response. Re-arm it with [`$resetOneTime`](/docs/resetonetime/). This function does not exist in BDFD.

It is useful for one-time rewards, a "claim your gift" command, a giveaway code that only one person can take, or a setup command that must not run twice.

## Syntax

```
$onlyOneTime[script;type;(errorMessage)]
```

## Parameters

| Parameter | Description |
|---|---|
| `script` | What to run. Any functions or text; its result is the result of `$onlyOneTime`. It is evaluated **only** when the claim is free. |
| `type` | Required. Who shares the claim: `user` (once per user, in all servers), `server` (once per server, for all its users) or `global` (once for everybody). Any other value raises "One-time type must be user, server or global.". |
| `errorMessage` | Optional. Sent as the response when the claim is already taken. Empty or missing: the function raises the error "Already used once.", which `$try` can catch. |

Each claim is kept **per command** (the command ID, otherwise its name, or the workflow name), so two commands never share one. `user` needs the ID of the user, `server` the ID of the server (it fails in a direct message).

## How it works

1. The claim is taken **before** the script runs, so two people using the command at the same moment cannot both get the reward.
2. Already taken → the script stops, the response written so far is discarded and `errorMessage` is sent.
3. If the script itself **fails** (an error), the claim is given back, so a failure does not use up the only chance. `$stop`, `$onlyIf` and similar guards end the run on purpose and keep the claim.

The `;` inside `script` separates parameters like everywhere else: use functions with their own brackets, or `$unescape`/`$esc` for a literal semicolon.

## Return value

- The result of `script` the first time, nothing afterwards (the run stops with `errorMessage`).

## Examples

### One gift per user

```bdfd
$onlyOneTime[$setUserVar[coins;$sum[$getUserVar[coins];100]]You received 100 coins!;user;You already claimed your gift.]
```

### First come, first served

```bdfd
$onlyOneTime[The code is **4821**.;global;Someone already took the code.]
```

### Give another chance sometimes

```bdfd
$onlyOneTime[Welcome!;user;Already done.]
$if[$random[1;5]==1]
  $resetOneTime
$endif
```
