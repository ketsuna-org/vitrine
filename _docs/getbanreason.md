---
layout: doc
title: $getBanReason
translation_key: docs
category: "Moderation"
function_name: getBanReason
syntax: $getBanReason[userID]
description: Gets the ban reason of a banned user on the server. Returns the reason stored in the server's ban list.
---

# $getBanReason

The `$getBanReason[]` function allows you to **retrieve the ban reason** of a banned user on the current server.

## Syntax

```
$getBanReason[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the banned user. |

## Return Value

- **Type**: String
- The ban reason as registered by Discord.
- An empty string if the user is not banned or if no reason was specified.

## Behavior

- The bot must have the `BAN_MEMBERS` permission to view ban reasons.
- The reason returned is the one provided during the ban (via `$ban[userID;reason]`).
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
  $sendMessage[]
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
**Checked on:** $date[$day]/$date[$month]/$date[$year]
]
$color[#5865F2]
$sendMessage[]
```

### Verification command

```bdfd
$if[$checkContains[$userPerms;BanMembers]==true]
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

- The reason is stored by Discord and is persistent.
- Useful for moderation logs and transparency.
- Only users with `BAN_MEMBERS` can view the reasons.
- Only works on the current server.
