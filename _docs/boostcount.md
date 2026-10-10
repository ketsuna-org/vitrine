---
layout: doc
title: $boostCount
translation_key: docs
category: "Entity Info"
function_name: boostCount
syntax: $boostCount
description: Returns the number of active boosts (server boosts) on the current server.
---

# $boostCount

The `$boostCount` function **retrieves the number of active server boosts** (Nitro server boosts) on the current server.

## Syntax

```
$boostCount
```

## Parameters

No parameters.

## Return value

- **Type**: String (number)
- The number of Nitro boosts currently active on the server.

## Behavior

- Counts the boosts of all members who have boosted the server.
- Each user can provide 1 or 2 boosts depending on their Nitro tier.
- The value influences the boost level of the server ($boostLevel).

## Examples

### Boost Statistics

```bdfd
$title[🚀 Server Boosts]
$description[
**Number of boosts:** $boostCount
**Level:** Level $boostLevel
]
$thumbnail[$serverIcon]
$color[#F47FFF]
```

### Thank-you message

```bdfd
$title[💜 Boost detected!]
$description[
Thank you **$username** for your boost! 
The server now has **$boostCount** boosts and is at **level $boostLevel**!
]
$color[#9B59B6]
$sendMessage[$channelID[boosts]]
```

### Storing the values

```bdfd
$var[current;$boostCount]
$var[level;$boostLevel]

$title[📈 Boost Progression]
$description[
**$var[current]** boosts, server at level **$var[level]**
]
$color[#F47FFF]
```

## Notes

- Boosts are tied to members' Nitro subscriptions.
- The boost is removed if the member leaves the server or stops their subscription.
- For the current level, use `$boostLevel`.
