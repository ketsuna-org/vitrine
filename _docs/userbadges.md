---
layout: doc
title: $userBadges
translation_key: docs
category: "Entity Info"
function_name: userBadges
syntax: $userBadges[(User ID;Separator)]
description: Returns the badge names of a user (the author by default), separated by a space unless a separator is given.
---

# $userBadges

The function `$userBadges` returns the **badges** of a user as a list of names, computed from the public flags Discord reports for that user.

## Syntax

```
$userBadges[(User ID;Separator)]
```

## Parameters

| Parameter | Description |
|---|---|
| `User ID` | Optional. The user to read. If omitted or empty, the command author is used. A non-numeric or non-positive value raises `Invalid user ID.` |
| `Separator` | Optional. The text placed between badge names. If omitted, a space. |

## Return Value

- **Type**: String
- The names of the badges of the user, in a fixed order, separated by the separator: `staff`, `partner`, `hype_squad`, `bug_hunter_level_1`, `hype_squad_bravery`, `hype_squad_brilliance`, `hype_squad_balance`, `premium_early_supporter`, `team_pseudo_user`, `bug_hunter_level_2`, `verified_bot`, `verified_developer`, `certified_moderator`, `bot_http_interactions`, `active_developer`.
- An empty string if the user has no badge or cannot be found.

## Behavior

- A user that cannot be read has no badge: the result is an empty string, not an error.
- For the command author, if the host supplied a `user.badges` context variable, its text is returned as is (the separator does not apply to it).

## Examples

### Display the value in an embed

```bdfd
$title[Profile of $userName]
$description[
**ID:** $userID
**Badges:** $userBadges
]
$color[#5865F2]
```

### Another user, custom separator

```bdfd
$sendMessage[Badges: $userBadges[$mentioned[1];, ]]
```

### Test whether any badge exists

```bdfd
$if[$userBadges==]
  $sendMessage[No badge.]
$else
  $sendMessage[Badges: $userBadges]
$endif
```

## Notes

- To test one badge, use `$checkContains[$userBadges[$authorID];active_developer]`.
