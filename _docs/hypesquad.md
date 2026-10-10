---
layout: doc
title: $hypeSquad
translation_key: docs
category: "Entity Info"
function_name: hypeSquad
syntax: $hypeSquad[(userID)]
description: Returns the HypeSquad value supplied by the host in the user.hypesquad context variable, or an empty string.
---

# $hypeSquad

The function `$hypeSquad[]` returns the value of the `user.hypesquad` context variable supplied by the host. The engine does not query Discord for the HypeSquad house.

## Syntax

```
$hypeSquad[(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional - Accepted but ignored: the value returned is always `user.hypesquad`, whatever the ID. |

## Return Value

- **Type**: String
- The text of the `user.hypesquad` context variable exactly as the host supplied it (for example `Bravery`).
- An empty string (not `None`) if the host supplied no value.

## Behavior

- The function can be called with no parameter or with one parameter; the parameter has no effect and the house of another user cannot be queried.
- The engine does not parse or translate the value.

## Examples

### Simple display

```bdfd
$title[🏠 HypeSquad]
$description[Your HypeSquad house: **$hypeSquad**]
```

### Custom message according to the house

```bdfd
$var[house;$hypeSquad[$authorID]]

$if[$var[house]==Bravery]
  🟣 House of Courage
$elseif[$var[house]==Brilliance]
  🟠 House of Brilliance
$elseif[$var[house]==Balance]
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
**HypeSquad:** $hypeSquad
**Badges:** $userBadges
]
$thumbnail[$userAvatar[$mentioned[1]]]
```

## Notes

- `$userBadges` works the same way with the `user.badges` context variable.
