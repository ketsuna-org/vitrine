---
layout: doc
title: $userBadges
translation_key: docs
category: "Entity Info"
function_name: userBadges
syntax: $userBadges
description: Returns the list of badges (public flags) of the user who triggered the command.
---

# $userBadges

The variable `$userBadges` returns the **list of public badges** (public flags) of the user. These badges are visible on the Discord profile and indicate various statuses (Nitro, HypeSquad, developer, etc.).

## Syntax

```
$userBadges
```

## Return Value

- **Type**: List/array of strings
- Possible badges: `Discord Employee`, `Partnered Server Owner`, `HypeSquad Events`, `Bug Hunter Level 1`, `House Bravery`, `House Brilliance`, `House Balance`, `Early Supporter`, `Bug Hunter Level 2`, `Early Verified Bot Developer`, `Active Developer`, `Moderator Programs Alumni`

## Behavior

- `$userBadges` takes **no arguments**.
- Returns only **public** badges (displayed on the profile).
- Internal or hidden badges are not included.

## Examples

### Display Badges in an Embed

```bdfd
$title[Profile of $userName]
$author[$userName;$userAvatar]
$description[
**ID:** $userID
**Badges:** $userBadges
]
$color[#5865F2]
$sendMessage[]
```

### Check a Specific Badge

```bdfd
$if[$checkContains[$userBadges;Early Supporter]==true]
  $sendMessage[Thank you for supporting Discord since the beginning! 💎]
$endif
```

## Notes

- Not all users have badges — the list can be empty.
- Badges are assigned by Discord and cannot be modified.
- Use `$checkContains[]` to check for the presence of a specific badge.
