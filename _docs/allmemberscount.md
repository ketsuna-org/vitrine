---
layout: doc
title: $allMembersCount
translation_key: docs
category: "Entity Info"
function_name: allMembersCount
syntax: $allMembersCount
description: Returns the total number of members on the server (including bots). Unlike $membersCount, this function also counts bots.
---

# $allMembersCount

The `$allMembersCount` function **retrieves the total number of members** on the server, including bots.

## Syntax

```
$allMembersCount
```

## Parameters

No parameters.

## Return value

- **Type**: String (number)
- The total number of members (users + bots) present on the server.

## Behavior

- Counts all members of the server, including bots.
- Differs from `$membersCount` which only counts human users.
- The value is updated in real time.

## Examples

### Simple display

```bdfd
$title[📊 Server Statistics]
$description[
**Total Members:** $allMembersCount
**Humans:** $membersCount
**Bots:** $botCount
]
$color[#5865F2]
$sendMessage[]
```

### Comparison of humans vs bots

```bdfd
$let[humans;$membersCount]
$let[bots;$botCount]
$let[total;$allMembersCount]

$title[👥 Server Composition]
$description[
**Total:** $total members
**👤 Humans:** $humans ($math[$humans*100/$total]%)
**🤖 Bots:** $bots ($math[$bots*100/$total]%)
]
$color[#57F287]
$sendMessage[]
```

### Welcome counter

```bdfd
$title[🎉 Welcome to $serverName!]
$description[
You are member number **$allMembersCount** of the server!
]
$thumbnail[$userAvatar[$authorID]]
$sendMessage[$channelID[welcome]]
```

## Notes

- Only includes members currently present on the server.
- To get only humans, use `$membersCount`.
- To get only bots, use `$botCount`.
