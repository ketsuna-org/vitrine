---
layout: doc
title: $serverBoostCount[]
translation_key: docs
category: "Entity Info"
function_name: serverBoostCount
syntax: $serverBoostCount[(guildID)]
description: Returns the number of active Nitro boosts on the Discord server.
---

# $serverBoostCount[] — Number of Server Boosts

`$serverBoostCount[]` returns the number of boosts that Discord reports for the server (its premium subscription count).

## Syntax

```
$serverBoostCount[(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | *(Optional)* The ID of a server. If omitted or empty, the current server is used. A non-empty value that is not a positive integer raises `Invalid guild ID.` |

## Return Value

- **Type**: `integer`
- The boost count fetched from Discord.
- If it is not available, the `guild.boostCount` context variable supplied by the host, or `0` if there is none.

## Examples

### Simple display

```bdfd
$sendMessage[🚀 **$serverBoostCount** Nitro boosts on this server!]
```

### Thank you embed

```bdfd
$title[🚀 Boosters of $serverName]
$description[Thank you to the $serverBoostCount boosters supporting the server!]
$addField[Current Level;$boostLevel;yes]
$color[#F47FFF]
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
```

### Boost level check

```bdfd
$if[$boostLevel>=3]
  $sendMessage[🌟 Level 3 reached! Enjoy all the perks.]
$elseIf[$boostLevel>=1]
  $sendMessage[🎈 Boost level $boostLevel with $serverBoostCount boosts.]
$else
  $sendMessage[💪 No boost level reached yet ($serverBoostCount boosts).]
$endif
```

## Notes

- `$boostLevel` returns the boost level reported by Discord for the current server (it raises `Guild boost level is unavailable.` if Discord does not provide it).
