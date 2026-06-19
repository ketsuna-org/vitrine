---
layout: doc
title: $unBanID
translation_key: docs
category: "Moderation"
function_name: unBanID
syntax: $unBanID[userID]
description: Unbans a user from the server using only their ID. Works similarly to $unBan but optimized for raw IDs.
---

# $unBanID

The function `$unBanID[]` allows **unbanning a user by their ID**. Similar to `$unBan[]`, it is optimized for cases where only the raw ID is available.

## Syntax

```
$unBanID[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The Discord ID of the user to unban. |

## Return Value

- **Type** : String (empty on success)
- Empty string if the unban succeeds.
- Error message on failure (user not banned, insufficient permissions, etc.).

## Behavior

- Works identically to `$unBan[]`.
- The bot must have the `BAN_MEMBERS` permission.
- Accepts only a raw ID (not a mention).

## Examples

### Unban from a list

```bdfd
$let[bans;$getBanList[, ]]
$textSplit[$bans;, ]
  $let[userID;$splitText[$index]]
  $if[$checkCondition[$userID==$mentioned[1]]==true]
    $unBanID[$userID]
    ✅ **$userName[$userID]** was unbanned.
    $break
  $endif
$endTextSplit
```

### Scheduled unban

```bdfd
$let[target;$noMentionMessage]
$if[$isBanned[$target]==true]
  $unBanID[$target]
  $title[🔓 Automatic unban]
  $description[
  User **$target** was unbanned (end of ban duration).
  ]
  $color[#57F287]
  $sendMessage[$channelID[mod-logs]]
$endif
```

## Notes

- `$unBanID[]` is interchangeable with `$unBan[]` for raw IDs.
- The difference is minimal; prefer `$unBan[]` which also handles mentions.
- Useful for internal scripts where only the ID is known.
