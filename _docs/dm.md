---
layout: doc
title: $dm
translation_key: docs
category: "Embed & Message"
function_name: dm
syntax: $dm[userID]
description: Redirects the response of the current command to the private messages (DM) of one or several users. Bare $dm targets the author, $dm[] the first mentioned user.
---

# $dm

The `$dm` function **redirects the response** of the command (text, embeds, components built in the command) to a Discord user's private messages instead of the channel.

## Syntax

```
$dm[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional, repeatable (`$dm[userID;userID2]`). The ID of a recipient (a positive integer, else the error "Invalid user ID." is raised). An empty ID (`$dm[]`) stands for the first user mentioned in the message. Without brackets (`$dm`), the command author is used. |

There is no `content` parameter: the message content is the rest of the command's text (and embeds).

## Return value

- An empty string. The function only sets the recipient; the message is sent when the response is flushed.

## Behavior

- **`$dm`** (no brackets): the recipient is the command author.
- **`$dm[]`**: the recipient is the first user mentioned in the message. If nobody is mentioned, the error "A user ID or user mention is required." is raised (the author is **not** used as a fallback).
- **`$dm[ID;ID;...]`**: each user given receives the response, once (a repeated ID is not messaged twice). An empty ID among them stands for the first mentioned user. An invalid ID raises "Invalid user ID." before anything is sent.
- Sets the destination of the response draft to the users' DMs; the response (text, embeds, components) is sent there instead of the channel.
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

### DM to the mentioned user

```bdfd
$dm[]
$username sent you this message: $noMentionMessage
```

Without a mention, the command fails with "A user ID or user mention is required.". To answer politely instead:

```bdfd
$if[$mentioned[1]!=]
  $dm[]
  $username sent you this message: $noMentionMessage
$else
  Please mention a user.
$endif
```

### DM to several users

```bdfd
$dm[$authorID;$mentioned[1]]
Meeting in 10 minutes.
```

Both the author and the mentioned user receive the message.

## Notes

- Unlike `$sendMessage`, the response is not posted in the current channel.
- `$dm` applies to the command's main response, not to each `$sendMessage` call.
