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
$let[limit;$voiceUserLimit]
$let[users;$voiceMembersCount]

$if[$limit==0]
  Unlimited channel — **$users** user(s) connected.
$else
  Channel: **$users / $limit** users.
  $if[$users>=$limit]
    ⚠️ Channel full!
  $else
    ✅ $math[$limit-$users] spot(s) available.
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
$let[target;$channelID[Gaming Channel]]
$let[limit;$voiceUserLimit[$target]]
$let[users;$voiceMembersCount[$target]]

$if[$users<$limit]
  $sendMessage[✅ You can join <#$target>.]
$else
  $sendMessage[❌ <#$target> is full ($users/$limit).]
$endif
```

## Notes

- `0` = no limit (unlimited), which is the default value for voice channels.
- The maximum limit is 99 users.
- Works only with channels of type voice (`$channelType` = 2).
