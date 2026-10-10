---
layout: doc
title: $getServerInvite
translation_key: docs
category: "Moderation"
function_name: getServerInvite
syntax: $getServerInvite[(guildID)]
description: Returns the server invite link supplied by the host in the context (guild.invite); it does not create an invite. Empty if none is supplied.
---

# $getServerInvite

The function `$getServerInvite[]` returns the invite link that the host provides for the server in the execution context (variable `guild.invite`). It does **not** call Discord and does **not** create an invite.

## Syntax

```
$getServerInvite[(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | Optional. Accepted but ignored: the value is not read and does not select another server. |

## Return Value

- **Type**: String
- The value of `guild.invite` when the host supplies it (for example `https://discord.gg/CODE`).
- An empty string when no invite is supplied. It never raises an error.

## Behavior

- No permission is checked and no invite is created by this function.
- Since the result can be empty, test it before displaying it.

## Examples

### Server invite link

```bdfd
$var[invite;$getServerInvite]
$if[$var[invite]!=]
  $sendMessage[Invite your friends: $var[invite]]
$else
  $sendMessage[No invite link is available for this server.]
$endif
```

### Display in an embed

```bdfd
$title[🌐 Server Invite]
$description[Here is the invite link for **$serverName**: $getServerInvite]
$color[#5865F2]
```

## Notes

- To invite the bot itself, use `$getBotInvite`.
- To read data about an invite code, use `$getInviteInfo[]`.
