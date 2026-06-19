---
layout: doc
title: $banID
translation_key: docs
category: "Moderation"
function_name: banID
syntax: $banID[userID;(reason)]
description: Bans a user by their user ID.
---

# $banID

The `$banID` function **bans a user by their Discord ID**, even if they are not present on the server. The bot must have the `BanMembers` permission.

## Syntax

```
$banID[userID;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The Discord ID of the user to ban. Required. |
| `reason` | Optional. The ban reason. |

## Return value

None. The user is banned from the server.

## Examples

### Ban by ID simple

```bdfd
$banID[123456789012345678;Raid]
$sendMessage[User 123456789012345678 banned for raiding.]
```

### Preventive ban

```bdfd
$banID[$message[1]]
$sendMessage[User $message[1] preventively banned.]
```

## Notes

- Allows banning a user who is no longer on the server.
- Useful for preventive bans.
- The bot must have the `BanMembers` permission.
- Unlike `$ban`, this does not delete messages.
