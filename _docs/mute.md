---
layout: doc
title: $mute
translation_key: docs
category: "Moderation"
function_name: mute
syntax: $mute[userID;(reason)]
description: Mutes a user on the server.
---

# $mute

The function `$mute` **mutes a user** on the Discord server. This prevents them from speaking in voice channels. The bot must have the `MuteMembers` permission.

## Syntax

```
$mute[userID;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user to mute. Required. |
| `reason` | Optional. The reason for the mute. |

## Return Value

None. The user is muted.

## Examples

### Simple Mute

```bdfd
$mute[$mentioned[1];Spam vocal]
$sendMessage[<@$mentioned[1]> was muted for voice spam.]
```

### Mute with moderation command

```bdfd
$if[$argsCount<1]
  $sendMessage[Usage: !mute <@mention> <reason>]
  $stop
$endif

$mute[$mentioned[1];$replaceText[$message;-;$mentioned[1];]]
$sendMessage[🔇 <@$mentioned[1]> is now muted.]
```

### Verification before mute

```bdfd
$if[$isAdmin==true]
  $mute[$mentioned[1];Violation of voice rules]
  $sendMessage[Member muted.]
$else
  $sendMessage[Permission denied.]
$endif
```

## Notes

- The bot must have the `MuteMembers` permission.
- The mute prevents users from speaking in voice channels, not from writing in text channels.
- To prevent sending messages, create a role without write permissions and use `$giveRole`.
- To unmute the user, use `$unmute`.
- For a temporary timeout, use `$timeout`.
