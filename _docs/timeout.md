---
layout: doc
title: $timeout
translation_key: docs
category: "Moderation"
function_name: timeout
syntax: $timeout[userID;duration;(reason)]
description: Temporarily times out a user (temporary silence).
---

# $timeout

The function `$timeout` times out a user on Discord. During the specified duration, the user cannot send messages, speak in voice channels, or react. The bot must have the `ModerateMembers` permission.

## Syntax

```
$timeout[userID;duration;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user. Required. |
| `duration` | Duration of the timeout. Required. Accepted formats: `s` (seconds), `m` (minutes), `h` (hours), `d` (days). Examples: `"60s"`, `"5m"`, `"1h"`, `"7d"`. |
| `reason` | Optional. The reason for the timeout. |

## Return Value

None. The user is timed out for the specified duration.

## Examples

### Timeout of 5 Minutes

```bdfd
$timeout[$mentioned[1];5m;Spam in the chat]
$sendMessage[⏳ <@$mentioned[1]> has been timed out for 5 minutes.]
```

### Timeout of One Hour

```bdfd
$timeout[$mentioned[1];1h;Toxic behavior]
$sendMessage[⏳ 1-hour timeout applied.]
```

### Timeout of 7 Days

```bdfd
$timeout[$mentioned[1];7d;Repeatedly breaking the rules]
$sendMessage[⏳ 7-day timeout applied. Next infraction will result in a ban.]
```

### Customizable Timeout Command

```bdfd
$if[$argsCount<2]
  $sendMessage[Usage: !timeout <@mention> <duration> <reason>]
  $stop
$endif

$timeout[$mentioned[1];$message[2];$message[3]]
$sendMessage[Timeout applied.]
```

## Notes

- The bot must have the `ModerateMembers` permission.
- The maximum duration is 28 days (Discord limit).
- Duration formats: `s` (seconds), `m` (minutes), `h` (hours), `d` (days).
- To remove a timeout early, use `$unTimeout`.
- Unlike a mute, a timeout also prevents sending text messages.

