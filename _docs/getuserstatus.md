---
layout: doc
title: $getUserStatus
translation_key: docs
category: "Entity Info"
function_name: getUserStatus
syntax: $getUserStatus[(userID)]
description: Returns the presence status (online, idle, dnd, offline) of the specified user.
---

# $getUserStatus

The function `$getUserStatus[]` returns the **presence status** of a user on Discord.

## Syntax

```
$getUserStatus[(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional - Accepted but ignored by the engine: the status returned is always the `user.status` value supplied by the host. |

## Return Value

- **Type**: String
- The status supplied by the host in the `user.status` context variable (for example `online`, `idle`, `dnd`, `offline`).
- `offline` if the host supplied no status.

## Behavior

- The function can be called with no parameter or with one parameter; the parameter has no effect and the status of another user cannot be queried.
- The engine does not query Discord itself: it only reads the `user.status` context variable.

## Examples

### Display the status with an emoji

```bdfd
$var[status;$getUserStatus]
$if[$var[status]==online]
  $var[emoji;🟢]
$elseif[$var[status]==idle]
  $var[emoji;🟡]
$elseif[$var[status]==dnd]
  $var[emoji;🔴]
$else
  $var[emoji;⚫]
$endif

$title[Status of $userName]
$description[**Status:** $var[emoji] $var[status]]
$color[#5865F2]
```

### Do not disturb

```bdfd
$if[$getUserStatus==dnd]
  $sendMessage[⚠️ You are in Do Not Disturb mode.]
$endif
```

## Notes

- `offline` is also the value returned when no status is available.
