---
layout: doc
title: $isBooster
translation_key: docs
category: "Entity Info"
function_name: isBooster
syntax: $isBooster
description: Returns "true" if the user is a server booster (Nitro Boost), and "false" otherwise.
---

# $isBooster

The function `$isBooster` returns `"true"` if the user is a **Nitro Booster** of the current server.

## Syntax

```
$isBooster
```

## Return Value

- **Type**: String `"true"` or `"false"`
- `"true"`: The user boosts the server.
- `"false"`: The user does not boost the server.

## Behavior

- `$isBooster` takes **no arguments**.
- Detection is based on the booster role or the member's boost status.
- A user can boost multiple servers simultaneously (depending on their Nitro subscription).

## Examples

### Automatic thank you

```bdfd
$if[$isBooster==true]
  $title[Thanks for the boost! 🚀]
  $description[
  Thanks to you, the server benefits from:
  - More emojis
  - Better audio quality
  - Server banner
  - And much more!
  ]
  $color[#F47FFF]
  $sendMessage[]
$endif
```

### Exclusive channel for boosters

```bdfd
$if[$isBooster==true]
  $sendMessage[Welcome to the exclusive boosters channel!]
$else
  $sendMessage[This channel is reserved for server boosters.]
  $stop
$endif
```

## Notes

- The classic color of the Nitro boost is `#F47FFF` (pink/magenta).
- Boosters often have a special badge (visible with `$userBadges`).
- Useful for creating exclusive perks for boosters (channels, roles, commands).
