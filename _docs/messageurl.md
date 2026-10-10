---
layout: doc
title: $messageURL
translation_key: docs
category: "Entity Info"
function_name: messageURL
syntax: $messageURL[(channelID;messageID)]
description: Returns the jump URL (direct link) to the triggering message.
---

# $messageURL

The function `$messageURL` returns the **jump URL** (direct link) to the message that triggered the command. This link allows users to navigate directly to the message in Discord.

## Syntax

```
$messageURL[(channelID;messageID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | *(Optional, only together with `messageID`)* The channel of the message. |
| `messageID` | *(Optional, only together with `channelID`)* The ID of the message. |

With exactly two arguments the URL is built from them without any check. With zero arguments (or one, which is ignored) the `message.url` context variable is returned.

## Return Value

| Type | Description |
|---|---|
| `string` | With two arguments: `https://discord.com/channels/{guildID}/{channelID}/{messageID}`, where `{guildID}` is the `guild.id` context variable, or `@me` if there is none. Otherwise: the `message.url` context variable supplied by the host (for message events the jump URL of the triggering message), or an empty string. |

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
```

### Log with link

```bdfd
$channelSendMessage[$channelIDFromName[logs];Message by $username: $messageURL]
```

## Notes

- Format: `https://discord.com/channels/{guildID}/{channelID}/{messageID}`.
- In a message event outside a server the host builds the URL with `@me` as guild.
- The two-argument form does not validate the IDs and does not contact Discord.

