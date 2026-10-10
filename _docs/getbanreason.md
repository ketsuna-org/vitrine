---
layout: doc
title: $getBanReason
translation_key: docs
category: "Moderation"
function_name: getBanReason
syntax: $getBanReason[userID;(guildID)]
description: Gets the ban reason of a banned user on the server. Returns the reason stored in the server's ban list.
---

# $getBanReason

The `$getBanReason[]` function allows you to **retrieve the ban reason** of a banned user on the current server (or on the server given by `guildID`).

## Syntax

```
$getBanReason[userID;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the banned user. Required; must be a positive number, otherwise the error `Invalid user ID.` is raised. |
| `guildID` | Optional. The server whose ban list is read. If omitted or empty, the current server is used. A non-numeric or non-positive value raises `Invalid guild ID.` |

## Return Value

- **Type**: String
- The ban reason as registered by Discord.
- An empty string if the user is not banned or if no reason was specified.

## Behavior

- The bot must have the `Ban Members` permission in the target server to read its bans; otherwise an error is raised.
- The reason returned is the one provided during the ban (via `$banID[reason;userID]`).
- If the user is not banned, it returns an empty string.

## Examples

### Ban verification

```bdfd
$var[reason;$getBanReason[$mentioned[1]]]
$if[$var[reason]!=]
  $title[🔨 Banned User]
  $description[
  **User:** $userName[$mentioned[1]]
  **ID:** $mentioned[1]
  **Reason:** $var[reason]
  ]
  $color[#ED4245]
$else
  $sendMessage[This user is not banned.]
$endif
```

### Ban log

```bdfd
$var[reason;$getBanReason[$userID]]
$title[📋 Ban Details]
$description[
**User:** $userName[$userID] ($userID)
**Ban Reason:** $var[reason]
**Checked on:** $day/$month/$year
]
$color[#5865F2]
```

### Verification command

```bdfd
$if[$hasPerms[$authorID;BanMembers]==true]
  $var[target;$findUser[$message]]
  $if[$var[target]!=]
    $var[reason;$getBanReason[$var[target]]]
    $if[$var[reason]!=]
      $sendMessage[**$userName[$var[target]]** is banned. Reason: $var[reason]]
    $else
      $sendMessage[**$userName[$var[target]]** is not banned.]
    $endif
  $else
    $sendMessage[User not found.]
  $endif
$else
  $sendMessage[Permission denied.]
$endif
```

## Notes

- The reason is read live from the server's ban list (Discord).
- Useful for moderation logs and transparency.
- The bot needs `Ban Members` in the server whose ban list is read.
- The result is empty both when the user is not banned and when the ban has no reason.
