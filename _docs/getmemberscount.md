---
layout: doc
title: $getMembersCount
translation_key: docs
category: "Server & Channels"
function_name: getMembersCount
syntax: $getMembersCount
description: Returns the total number of members on the server (including bots). Possible alias of $membersCount.
---
# $getMembersCount

The function `$getMembersCount` returns the **total number of members** of the Discord server.

## Syntax

```
$getMembersCount
```

## Parameters

None.

## Return Value

- **Type**: Number (string)
- The total number of members (humans + bots).

## Examples

### Simple Display

```bdfd
$sendMessage[👥 This server has $getMembersCount members!]
```

### Welcome Message

```bdfd
$title[👋 Welcome $username!]
$description[
Welcome to **$serverName**!
You are member **#$getMembersCount**!
]
$thumbnail[$authorAvatar]
$color[#57F287]
$sendMessage[]
```

### Size Condition

```bdfd
$if[$getMembersCount<100]
  $sendMessage[We are still a small community of $getMembersCount members 💚]
$elseIf[$getMembersCount<1000]
  $sendMessage[Already $getMembersCount members, thank you all! 🎉]
$else
  $sendMessage[Over 1000 members, incredible! 🚀]
$endif
```

### Server Stats

```bdfd
$title[📊 Statistics of $serverName]
$description[
**Members:** $getMembersCount
**Bots:** $botCount
**Channels:** $channelCount
**Roles:** $roleCount
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Includes bots in the count. For humans only, do `$c[$getMembersCount-$botCount]`.
- Functionally equivalent to `$membersCount`.
- Updates automatically when members join/leave.
