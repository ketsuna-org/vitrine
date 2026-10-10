---
layout: doc
title: $boostLevel[]
translation_key: docs
category: "Entity Info"
function_name: boostLevel
syntax: $boostLevel
description: Returns the boost level (tier) of the current Discord server, as reported by Discord.
---

# $boostLevel[] — Server Boost Level

`$boostLevel[]` returns the current boost level (premium tier) of the server, as reported by Discord.

## Syntax

```
$boostLevel
```

## Parameters

No parameters (passing one is an error).

## Return value

- **Type**: `integer`
- The numeric tier value of the server given by Discord (`0` when the server has no boost level; `1`, `2` and `3` for the boost levels).
- If Discord does not give a value, the error `Guild boost level is unavailable.` is raised.

## Examples

### Simple display

```bdfd
$sendMessage[🚀 Boost Level: **$boostLevel** ($serverBoostCount boosts)]
```

### Embed of progression

```bdfd
$var[boostsNeeded;0]
$if[$boostLevel==0]
$var[boostsNeeded;$sub[2;$serverBoostCount]]
$var[nextLevel;1]
$elseIf[$boostLevel==1]
$var[boostsNeeded;$sub[7;$serverBoostCount]]
$var[nextLevel;2]
$elseIf[$boostLevel==2]
$var[boostsNeeded;$sub[14;$serverBoostCount]]
$var[nextLevel;3]
$else
$var[boostsNeeded;0]
$var[nextLevel;MAX]
$endif

$title[🚀 Boost — $serverName]
$addField[Current Level;$boostLevel;yes]
$addField[Boosts;$serverBoostCount;yes]
$if[$boostLevel<3]
$addField[Next Level;$var[boostsNeeded] boosts remaining for level $var[nextLevel];yes]
$endif
$color[#F47FFF]
```

### Info server with boost

```bdfd
$title[$serverName]
$addField[🚀 Boost Level;$boostLevel ($serverBoostCount boosts);yes]
$addField[🎨 Emojis;$emojiCount;yes]
$thumbnail[$serverIcon]
$color[#F47FFF]
```

## Notes

- The server is read from Discord each time the function runs.
- To get the exact number of boosts, use `$boostCount` or `$serverBoostCount[]`.
