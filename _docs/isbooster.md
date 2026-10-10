---
layout: doc
title: $isBooster
translation_key: docs
category: "Entity Info"
function_name: isBooster
syntax: $isBooster[(userID);(guildID)]
description: Returns "true" if the user is a server booster (Nitro Boost), and "false" otherwise.
---

# $isBooster

The function `$isBooster` returns `"true"` if the member is currently **boosting** the server (Discord reports a boost start date for the member).

## Syntax

```
$isBooster[(userID);(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | *(Optional)* The ID of the member to check. Default: the author of the command. An empty value also selects the author; any other non-numeric value raises `Invalid user ID.` |
| `guildID` | *(Optional)* The ID of the server in which to check. Default: the current server. A non-empty value that is not a positive integer raises `Invalid guild ID.` |

## Return Value

- **Type**: String `"true"` or `"false"`
- `"true"`: The member has a boost start date (`premium_since`) in that server.
- `"false"`: The member does not boost the server.
- If the user is not a member of the server, the error `User is not a member of this guild.` is raised.

## Behavior

- Detection is based only on the member's boost start date; a booster role is not looked at.

## Examples

### Automatic thank you

```bdfd
$if[$isBooster==true]
  $title[Thanks for the boost! 🚀]
  $description[
  Thanks to you, the server benefits from:
  - More emojis
  - Better audio quality
  - Server banner
  - And much more!
  ]
  $color[#F47FFF]
$endif
```

### Exclusive channel for boosters

```bdfd
$if[$isBooster==true]
  $sendMessage[Welcome to the exclusive boosters channel!]
$else
  $sendMessage[This channel is reserved for server boosters.]
  $stop
$endif
```

## Notes

- Use `$isBooster[$authorID]` or `$isBooster` for the author, or pass a user ID to check someone else.
