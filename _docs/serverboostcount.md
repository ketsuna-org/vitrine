---
layout: doc
title: $serverBoostCount[]
translation_key: docs
category: "Entity Info"
function_name: serverBoostCount
syntax: $serverBoostCount
description: Returns the number of active Nitro boosts on the Discord server.
---

# $serverBoostCount[] — Number of Server Boosts

`$serverBoostCount[]` returns the total number of Nitro boosts applied to the server. Boosts unlock perks for the server (more emojis, better audio quality, banner, etc.).

## Syntax

```
$serverBoostCount
```

## Parameters

No parameters.

## Return Value

- **Type**: `integer`
- The number of active Nitro boosts on the server.

## Usage

### Simple display

```bdfd
$sendMessage[🚀 **$serverBoostCount** Nitro boosts on this server!]
```

### Thank you embed

```bdfd
$title[🚀 Boosters of $serverName]
$description[Thank you to the $serverBoostCount boosters supporting the server!]
$addField[Current Level;$boostLevel;yes]
$addField[Next Tier;$if[$boostLevel<3]Only $sub[$var[boostsNeeded];$serverBoostCount] boosts to go!$elseMaximum level reached 🎉$endif;yes]
$color[#F47FFF]
$sendEmbedMessage
```

### Complete server info

```bdfd
$title[📊 Statistics for $serverName]
$addField[👥 Members;$membersCount;yes]
$addField[🟢 Online;$onlineMembers;yes]
$addField[🤖 Bots;$botCount;yes]
$addField[🚀 Boosts;$serverBoostCount (Level $boostLevel);yes]
$addField[🎨 Emojis;$emojiCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Tier progression check

```bdfd
$if[$serverBoostCount>=14]
  $sendMessage[🌟 Level 3 reached! Enjoy all the perks.]
$elseIf[$serverBoostCount>=7]
  $sendMessage[🎈 Level 2! Only $sub[14;$serverBoostCount] boosts left to reach level 3.]
$elseIf[$serverBoostCount>=2]
  $sendMessage[🎀 Level 1! Only $sub[7;$serverBoostCount] boosts left to reach level 2.]
$else
  $sendMessage[💪 No boost level reached yet. $sub[2;$serverBoostCount] boosts required for level 1.]
$endif
```

## Notes

- Each boost counts as 1, regardless of who applied it.
- The number of boosts determines the boost level of the server:
  - Level 1: 2 boosts
  - Level 2: 7 boosts
  - Level 3: 14 boosts
- Use `$boostLevel[]` to get the level (0-3) directly without calculating the tiers manually.
