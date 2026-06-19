---
layout: doc
title: $hypeSquad
translation_key: docs
category: "Entity Info"
function_name: hypeSquad
syntax: $hypeSquad[(userID)]
description: Returns the HypeSquad house to which the user belongs (Bravery, Brilliance, Balance) or "None" if they are not part of any.
---

# $hypeSquad

The function `$hypeSquad[]` allows you to **find the HypeSquad house** of a Discord user. Returns `Bravery`, `Brilliance`, `Balance` or `None`.

## Syntax

```
$hypeSquad[(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional - The ID of the user. By default, the author of the command. |

## Return Value

- **Type**: String
- `Bravery` - House of Courage (purple)
- `Brilliance` - House of Brilliance (orange)
- `Balance` - House of Balance (green)
- `None` - The user has not joined a HypeSquad house.

## Behavior

- Checks the Discord profile of the user to determine their HypeSquad house.
- Participation in HypeSquad is a Discord profile option, distinct from the HypeSquad Events program.
- Returns `None` if the user has not chosen a house.

## Examples

### Simple display

```bdfd
$title[🏠 HypeSquad]
$description[Your HypeSquad house: **$hypeSquad**]
$sendMessage[]
```

### Custom message according to the house

```bdfd
$let[house;$hypeSquad[$authorID]]

$if[$house==Bravery]
  🟣 House of Courage
$elseif[$house==Brilliance]
  🟠 House of Brilliance
$elseif[$house==Balance]
  🟢 House of Balance
$else
  ⚪ No HypeSquad house
$endif
```

### Complete user info

```bdfd
$title[👤 $userName[$mentioned[1]]]
$description[
**ID:** $mentioned[1]
**HypeSquad:** $hypeSquad[$mentioned[1]]
**Badges:** $userBadges[$mentioned[1]]
]
$thumbnail[$userAvatar[$mentioned[1]]]
$sendMessage[]
```

## Notes

- Requires that the user has configured their HypeSquad house in their Discord settings.
- Distinct badges (the HypeSquad badge is managed by `$hasBadge` / `$userBadges`).
- House names are returned in English (Bravery, Brilliance, Balance).
