---
layout: doc
title: $messageURL
translation_key: docs
category: "Entity Info"
function_name: messageURL
syntax: $messageURL
description: Returns the jump URL (direct link) to the triggering message.
---

# $messageURL

The function `$messageURL` returns the **jump URL** (direct link) to the message that triggered the command. This link allows users to navigate directly to the message in Discord.

## Syntax

```
$messageURL
```

## Parameters

None.

## Return Value

| Type | Description |
|---|---|
| `string` | URL format: `https://discord.com/channels/{guildID}/{channelID}/{messageID}`. |

## Examples

### Direct link

```bdfd
$sendMessage[Original message: $messageURL]
```

### In an embed

```bdfd
$title[Reported Message]
$description[
**Author:** $username
**Content:** $message
**Link:** [Click here]($messageURL)
]
$color[#ED4245]
$sendMessage[]
```

### Log with link

```bdfd
$channelSendMessage[$channelIDFromName[logs];Message by $username: $messageURL]
```

## Notes

- Format: `https://discord.com/channels/{guildID}/{channelID}/{messageID}`.
- In DMs, the format uses the DM channel ID.
- The link only works if the user has access to the channel.

