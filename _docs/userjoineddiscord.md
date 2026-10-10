---
layout: doc
title: $userJoinedDiscord
translation_key: docs
category: "Entity Info"
function_name: userJoinedDiscord
syntax: $userJoinedDiscord[userID;(format)]
description: Returns the creation date of a Discord account (the registration date on the platform), derived from the ID and formatted with a Go time layout.
---

# $userJoinedDiscord

The `$userJoinedDiscord` function returns the **creation date** of the user's Discord account — that is to say, the date they registered on the Discord platform.

## Syntax

```
$userJoinedDiscord[userID;(format)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Required - The ID (snowflake) of the user. An invalid ID raises an error. |
| `format` | Optional - A Go time layout (e.g. `2006-01-02 15:04:05`). Default: `2006-01-02`. |

## Return Value

- **Type**: String
- The registration date of the account on Discord, formatted with `format` (default `2006-01-02`), in the timezone set with `$time[]`.

## Behavior

- `$userJoinedDiscord` requires at least the user ID: used without argument it is invalid.
- The date is derived from the user ID **snowflake** (the first bits encode an Epoch timestamp).
- Works for any user whose ID is known, even without server membership.

## Examples

### Display account age

```bdfd
$title[Account Information]
$description[
**Name:** $userName
**Account created on:** $userJoinedDiscord[$authorID]
**Member since:** $userJoined[$authorID]
]
$color[#5865F2]
$sendMessage[Account information]
```

### Check for a recent account

```bdfd
$if[$userJoinedDiscord[$authorID;2006]<2024]
  $sendMessage[Account created before 2024.]
$else
  $sendMessage[Recent account.]
$endif
```

## Notes

- `$userJoinedDiscord` = creation date of the **account** on Discord.
- `$userJoined` = join date on the **server**.
- The Discord ID (snowflake) encodes the creation date.
