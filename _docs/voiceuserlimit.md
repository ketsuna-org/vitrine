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
| `channelID` | Optional - The ID of the voice channel. By default, the channel where the author is located. |

## Return Value

- **Type**: String (number)
- The maximum number of users allowed in the channel.
- `0` means unlimited (no limit).

## Behavior

- If no channelID is provided and the author is not in a voice channel, it returns `0` or an error.
- The limit is set during creation/modification of the channel.
- Useful for checking capacity before joining or inviting.

## Examples

### Checking capacity

```bdfd
$var[limit;$voiceUserLimit]
$var[users;$voiceMembersCount]

$if[$var[limit]==0]
  Unlimited channel — **$var[users]** user(s) connected.
$else
  Channel: **$var[users] / $var[limit]** users.
  $if[$var[users]>=$var[limit]]
    ⚠️ Channel full!
  $else
    ✅ $math[$var[limit]-$var[users]] spot(s) available.
  $endif
$endif
```

### Voice channel info

```bdfd
$title[🔊 $channelName[$voiceChannelID]]
$description[
**Connected:** $voiceMembersCount
**Limit:** $if[$voiceUserLimit==0]Unlimited$else$voiceUserLimit$endif
**Bitrate:** $voiceBitrate kbps
]
$color[#5865F2]
$sendMessage[]
```

### Checking for a specific channel

```bdfd
$var[target;$channelID[Gaming Channel]]
$var[limit;$voiceUserLimit[$var[target]]]
$var[users;$voiceMembersCount[$var[target]]]

$if[$var[users]<$var[limit]]
  $sendMessage[✅ You can join <#$var[target]>.]
$else
  $sendMessage[❌ <#$var[target]> is full ($var[users]/$var[limit]).]
$endif
```

## Notes

- `0` = no limit (unlimited), which is the default value for voice channels.
- The maximum limit is 99 users.
- Works only with channels of type voice (`$channelType` = 2).
