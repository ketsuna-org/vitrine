---
layout: doc
title: $dm
translation_key: docs
category: "Embed & Message"
function_name: dm
syntax: $dm[userID;content]
description: Sends a private message (DM) to a user. The bot must be able to DM the target user.
---

# $dm

The `$dm[]` function **sends a private message** to a Discord user.

## Syntax

```
$dm[userID;content]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the recipient. |
| `content` | The content of the message (markdown and mentions supported). |

## Return value

- **Type**: Snowflake (string)
- The ID of the message sent.
- Empty string if the DM is impossible (user blocked, DMs closed).

## Behavior

- The bot must be able to send DMs to the user (not blocked, DMs open).
- Embeds defined before `$dm[]` are included.
- If the user has closed their DMs, the function fails silently.

## Examples

### Simple DM to the author

```bdfd
$dm[$authorID;Thank you for using the command!]
```

### DM with embed

```bdfd
$title[📬 Notification]
$description[Your request has been successfully received.\n\nA moderator will reply to you shortly.]
$color[#5865F2]
$footer[$serverName Team]
$dm[$authorID;]
```

### DM to a mentioned user

```bdfd
$if[$mentioned[1]!=]
  $dm[$mentioned[1];$username sent you this message: $noMentionMessage]
  $sendMessage[DM sent successfully!]
$else
  $sendMessage[Please mention a user.]
$endif
```

## Notes

- Unlike `$sendMessage`, the DM does not appear in the current channel.
- Limit of 2000 characters per message.
- For welcome DMs, check that the user accepts DMs.
