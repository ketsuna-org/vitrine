---
layout: doc
title: $timeout
translation_key: docs
category: "Moderation"
function_name: timeout
syntax: $timeout[duration;(userID)]
description: Temporarily times out a user (temporary silence).
---

# $timeout

The function `$timeout` times out a user on Discord. It sets Discord's communication timeout on the member until the given duration has elapsed. The bot must have the `ModerateMembers` permission.

## Syntax

```
$timeout[duration;(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `duration` | Duration of the timeout. Required. Units accepted: `ms`, `s`, `m`, `h`, `d`, `w`, `y` (also `millisecond`, `sec`, `second`, `min`, `minute`, `hour`, `day`, `week`, `year`, and their plural forms), which can be combined (e.g. `1h30m`); decimals are accepted. A bare number is read as seconds. Examples: `60s`, `5m`, `1h`, `7d`. Must be positive and at most 28 days, otherwise an error is raised. |
| `userID` | Optional - The ID of the user. If omitted or empty, the timeout is applied to every user mentioned in the message; an error is raised if there is none. |

## Return Value

None (empty string). The user is timed out for the specified duration. An error is raised if the duration or user ID is invalid, or if the bot cannot time out the user.

## Examples

### Timeout of 5 Minutes

```bdfd
$timeout[5m;$mentioned[1]]
$sendMessage[⏳ <@$mentioned[1]> has been timed out for 5 minutes.]
```

### Timeout of One Hour

```bdfd
$timeout[1h;$mentioned[1]]
$sendMessage[⏳ 1-hour timeout applied.]
```

### Timeout of 7 Days

```bdfd
$timeout[7d;$mentioned[1]]
$sendMessage[⏳ 7-day timeout applied. Next infraction will result in a ban.]
```

### Customizable Timeout Command

```bdfd
$timeout[$message[2];$mentioned[1]]
$sendMessage[Timeout applied.]
```

## Notes

- The bot must have the `ModerateMembers` permission.
- The maximum duration is 28 days.
- `$timeout` has no reason parameter.
- The bot cannot time out the server owner, an administrator, or a member whose highest role is not below its own.
- To remove a timeout early, use `$unTimeout`.

