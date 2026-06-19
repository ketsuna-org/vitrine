---
layout: doc
title: $userJoinedDiscord
translation_key: docs
category: "Entity Info"
function_name: userJoinedDiscord
syntax: $userJoinedDiscord
description: Returns the creation date of the user's Discord account (the registration date on the platform).
---

# $userJoinedDiscord

The `$userJoinedDiscord` function returns the **creation date** of the user's Discord account — that is to say, the date they registered on the Discord platform.

## Syntax

```
$userJoinedDiscord
```

## Return Value

- **Type**: Date/String
- The registration date of the account on Discord.

## Behavior

- `$userJoinedDiscord` takes **no arguments**.
- The date is derived from the user ID **snowflake** (the first bits encode an Epoch timestamp).
- Works for any user whose ID is known, even without server membership.

## Examples

### Display account age

```bdfd
$title[Account Information]
$description[
**Name:** $userName
**Account created on:** $userJoinedDiscord
**Member since:** $userJoined
]
$color[#5865F2]
$sendMessage[]
```

### Check for a recent account

```bdfd
$if[$userJoinedDiscord < 01/01/2024]
  $sendMessage[Account created before 2024.]
$else
  $sendMessage[Recent account.]
$endif
```

## Notes

- `$userJoinedDiscord` = creation date of the **account** on Discord.
- `$userJoined` = join date on the **server**.
- The Discord ID (snowflake) encodes the creation date, therefore this information is always available.
