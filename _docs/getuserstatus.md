---
layout: doc
title: $getUserStatus
translation_key: docs
category: "Entity Info"
function_name: getUserStatus
syntax: $getUserStatus[userID]
description: Returns the presence status (online, idle, dnd, offline) of the specified user.
---

# $getUserStatus

The function `$getUserStatus[]` returns the **presence status** of a user on Discord.

## Syntax

```
$getUserStatus[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user whose status you want to know. |

## Return Value

- **Type**: String
- Possible values:
  - `online` — Online (🟢)
  - `idle` — Idle (🟡)
  - `dnd` — Do Not Disturb (🔴)
  - `offline` — Offline (⚫)
  - `invisible` — Invisible (appears offline)

## Behavior

- Requires the **user ID** as a parameter.
- The status reflects the real-time presence on Discord.
- The `invisible` status is reported as `offline` to other users.

## Examples

### Display the status with an emoji

```bdfd
$var[status;$getUserStatus[$userID]]
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
$sendMessage[]
```

### Check the status of a mentioned user

```bdfd
$if[$mentioned!=]
  $var[status;$getUserStatus[$mentioned]]
  $sendMessage[<@$mentioned> is currently: **$var[status]**]
$else
  $sendMessage[Please mention a user.]
$endif
```

### Do not disturb

```bdfd
$if[$getUserStatus[$mentioned]==dnd]
  $sendMessage[⚠️ This user is in Do Not Disturb mode.]
$endif
```

## Notes

- The `offline` status can mean that the user is actually disconnected or in invisible mode.
- Users can hide their status based on their privacy settings.
- Useful for commands that need to know if a user is available (e.g., sending conditional direct messages).
