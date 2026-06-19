---
layout: doc
title: $boostLevel[]
translation_key: docs
category: "Entity Info"
function_name: boostLevel
syntax: $boostLevel
description: Returns the Nitro boost level of the Discord server (0, 1, 2 or 3).
---

# $boostLevel[] — Server Boost Level

`$boostLevel[]` returns the current Nitro boost level of the server, a value between 0 and 3.

## Syntax

```
$boostLevel
```

## Parameters

No parameters.

## Return value

- **Type**: `integer`
- An integer from 0 to 3:

| Level | Boosts required | Main Advantages |
|--------|---------------|---------------------|
| 0 | 0 | No advantages |
| 1 | 2 | +50 emoji slots, animated icon, 128 kbps audio |
| 2 | 7 | Server banner, 256 kbps audio, +100 emojis |
| 3 | 14 | Custom URL, 384 kbps audio, +150 emojis |

## Usage

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
$sendEmbedMessage
```

### Checking perks

```bdfd
$if[$boostLevel>=1]
$sendMessage[✅ Animated icon available]
$endif
$if[$boostLevel>=2]
$sendMessage[✅ Server banner available]
$endif
$if[$boostLevel>=3]
$sendMessage[✅ Custom URL available]
$endif
```

### Info server with boost

```bdfd
$title[$serverName]
$addField[🚀 Boost Level;$boostLevel ($serverBoostCount boosts);yes]
$addField[🎨 Emojis;$emojiCount;yes]
$addField[🔊 Audio Quality;$if[$boostLevel>=3]384 kbps$elseIf[$boostLevel>=2]256 kbps$elseIf[$boostLevel>=1]128 kbps$elseStandard$endif;yes]
$thumbnail[$serverIcon]
$color[#F47FFF]
$sendEmbedMessage
```

## Notes

- The boost level is calculated automatically depending on the number of Nitro boosts.
- Each tier unlocks cumulative perks (level 3 includes level 1 and 2 perks).
- Expired boosts are automatically removed.
- To get the exact number of boosts, use `$serverBoostCount[]`.
