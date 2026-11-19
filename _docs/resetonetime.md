---
layout: doc
title: $resetOneTime
translation_key: docs
category: "Cooldown"
function_name: resetOneTime
syntax: $resetOneTime[(user|server|global);(userID);(command)]
description: Re-arms a $onlyOneTime so it can run again. Not in BDFD.
---

# $resetOneTime

`$resetOneTime` **frees a claim** taken by [`$onlyOneTime`](/docs/onlyonetime/), so the script can run again. Nothing happens when the claim is already free. This function does not exist in BDFD.

## Syntax

```
$resetOneTime[(type);(userID);(command)]
```

## Parameters

| Parameter | Description |
|---|---|
| `type` | Optional. `user`, `server` or `global`. Without it, the types claimed by `$onlyOneTime` earlier in the **same run** are re-armed (`user` when there was none). Any other value raises "One-time type must be user, server or global.". |
| `userID` | Optional. Re-arms this user's claim instead of the current user's (for `user`). |
| `command` | Optional. ID (or name, for the running command) of the command whose claim is re-armed, to reset it from another command, for example an admin command. Default: the running command. |

## Return value

- An empty string.

## Examples

### Give another chance

```bdfd
$onlyOneTime[Welcome!;user;Already done.]
$if[$random[1;5]==1]
  $resetOneTime
$endif
```

### Admin command: re-arm a user's gift

```bdfd
$onlyPerms[administrator;Admins only.]
$resetOneTime[user;$mentioned[1];claim-gift]
Done.
```

### Re-arm for everybody

```bdfd
$resetOneTime[global]
```
