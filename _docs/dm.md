---
layout: doc
title: $dm
translation_key: docs
category: "Embed & Message"
function_name: dm
syntax: $dm[(userID)]
description: Redirects the response of the current command to a private message (DM) to a user (the author by default).
---

# $dm

The `$dm` function **redirects the response** of the command (text, embeds, components built in the command) to a Discord user's private messages instead of the channel.

## Syntax

```
$dm[(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional. The ID of the recipient (a positive integer, else the error "Invalid user ID." is raised). If omitted or empty (`$dm`, `$dm[]`), the command author is used. |

There is no `content` parameter: the message content is the rest of the command's text (and embeds).

## Return value

- An empty string. The function only sets the recipient; the message is sent when the response is flushed.

## Behavior

- Sets the destination of the response draft to the user's DMs; the response (text, embeds, components) is sent there instead of the channel.
- If the response is empty (no text, no embed, no component), nothing is sent.

## Examples

### Simple DM to the author

```bdfd
$dm[$authorID]
Thank you for using the command!
```

### DM with embed

```bdfd
$title[📬 Notification]
$description[Your request has been successfully received.\n\nA moderator will reply to you shortly.]
$color[#5865F2]
$footer[$serverName Team]
$dm[$authorID]
```

### DM to a mentioned user

```bdfd
$if[$mentioned[1]!=]
  $dm[$mentioned[1]]
  $username sent you this message: $noMentionMessage
$else
  Please mention a user.
$endif
```

## Notes

- Unlike `$sendMessage`, the response is not posted in the current channel.
- `$dm` applies to the command's main response, not to each `$sendMessage` call.
