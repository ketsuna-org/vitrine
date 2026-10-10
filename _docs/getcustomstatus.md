---
layout: doc
title: $getCustomStatus
translation_key: docs
category: "Entity Info"
function_name: getCustomStatus
syntax: $getCustomStatus[(userID)]
description: Returns the custom status text supplied in the command context (user.customStatus); an empty string when none is supplied. The user ID argument is ignored.
---

# $getCustomStatus

The `$getCustomStatus[]` function returns the custom status text that the host supplies to the command in the context variable `user.customStatus`.

## Syntax

```
$getCustomStatus[(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional. Accepted (0 or 1 argument) but **ignored**: the result does not depend on it. |

## Return Value

- **Type**: String
- The value of the context variable `user.customStatus`.
- An empty string when the context has no such variable.

## Behavior

- The function does not query Discord and does not read the presence of a user.
- The engine itself never sets `user.customStatus`, so the result is normally an empty string.
- `$getUserStatus` works the same way with `user.status` and returns `offline` when the variable is absent; `$hypeSquad` and `$userBadges` also only read context variables.

## Examples

### Simple display

```bdfd
$var[status;$getCustomStatus]
$if[$var[status]!=]
  Custom status: **$var[status]**
$else
  No custom status available.
$endif
```

## Notes

- Do not rely on this function to read the status of a Discord user: with the current engine it returns an empty string unless the host provides the value.
