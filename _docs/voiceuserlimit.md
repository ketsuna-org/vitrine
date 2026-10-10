---
layout: doc
title: $voiceUserLimit
translation_key: docs
category: "Moderation"
function_name: voiceUserLimit
syntax: $voiceUserLimit[(channelID)]
description: Gets the user limit of a voice channel. Returns the maximum number of users that can connect simultaneously.
---

# $voiceUserLimit

The `$voiceUserLimit` function allows you to **retrieve the user limit** configured on a Discord voice channel.

## Syntax

```
$voiceUserLimit[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional - The ID of the voice channel. By default, the current channel. |

## Return Value

- **Type**: String (number)
- The maximum number of users allowed in the channel.
- `0` means unlimited (no limit).

## Behavior

- If no channelID is provided, the current channel is used.
- The limit is set during creation/modification of the channel.
- Useful for checking capacity before joining or inviting.

## Examples

### Checking the limit

```bdfd
$var[limit;$voiceUserLimit[123456789012345678]]

$if[$var[limit]==0]
  Unlimited channel.
$else
  Channel limited to **$var[limit]** users.
$endif
```

### Voice channel info

```bdfd
$title[🔊 Voice channel]
$description[
**Limit:** $voiceUserLimit[123456789012345678] (0 = unlimited)
]
$color[#5865F2]
```

### Checking for a specific channel

```bdfd
$var[target;$channelID[Gaming Channel]]
$var[limit;$voiceUserLimit[$var[target]]]

$if[$var[limit]==0]
  $sendMessage[<#$var[target]> has no user limit.]
$else
  $sendMessage[<#$var[target]> is limited to $var[limit] users.]
$endif
```

## Notes

- `0` = no limit (unlimited), which is the default value for voice channels.
- The maximum limit is 99 users.
- Works only with channels of type voice (`$channelType` = 2).
