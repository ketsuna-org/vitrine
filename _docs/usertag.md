---
layout: doc
title: $userTag
translation_key: docs
category: "Entity Info"
function_name: userTag
syntax: $userTag
description: Returns the complete tag of the user in the form "username#discriminator" (legacy format). Since the migration to unique usernames, returns the username without discriminator.
---

# $userTag

The `$userTag` function returns the **complete tag** of the user. Historically, Discord used the `username#discriminator` format (e.g., "JeanDupont#1234"). Since the migration to unique usernames (the new system), the tag is simply the username.

## Syntax

```
$userTag
```

## Return Value

- **Type**: String
- Legacy format: `username#discriminator` (e.g., `JeanDupont#1234`)
- New format (unique usernames): simply the username.

## Behavior

- `$userTag` takes **no arguments**.
- For accounts created before the username migration, the tag may still include the 4-digit discriminator.
- For new accounts, the returned value is identical to `$userName`.

## Examples

### Display the tag

```bdfd
$title[Profile of $userTag]
$description[
**Name:** $userName
**Tag:** $userTag
**ID:** $userID
]
$color[#5865F2]
$sendMessage[]
```

### Check if the user has a legacy discriminator

```bdfd
$if[$discriminator!=0]
  $sendMessage[You have a legacy account: $userTag]
$else
  $sendMessage[You have a new account format: $userTag]
$endif
```

## Notes

- The legacy `username#discriminator` format is being phased out by Discord.
- For new users, `$userTag` is equivalent to `$userName`.
- Prefer `$userName` or `$displayName` for future compatibility.
