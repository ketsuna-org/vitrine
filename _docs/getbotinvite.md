---
layout: doc
title: $getBotInvite
translation_key: docs
category: "Moderation"
function_name: getBotInvite
syntax: $getBotInvite[(guildID)]
description: Generates and returns the bot's invite link with the necessary permissions. If a guildID is provided, the link is pre-filled for that server.
---

# $getBotInvite

The `$getBotInvite[]` function allows you to **generate the invite link of the bot** with the permissions necessary for its functioning.

## Syntax

```
$getBotInvite[(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | Optional - ID of the server to pre-select the server in the invite interface. |

## Return Value

- **Type**: String (URL)
- The complete invite URL of the bot.
- Format: `https://discord.com/oauth2/authorize?client_id=ID&permissions=...&scope=bot`

## Behavior

- The permissions included in the link correspond to those configured for the bot.
- If a guildID is provided, the server selector is pre-filled.
- The link includes the `bot` and `applications.commands` scopes automatically.

## Examples

### Invite command

```bdfd
$title[📨 Invite the bot]
$description[
Click on the link below to invite the bot to your server:

[$getBotInvite]

**Required permissions:**
- Manage messages
- Send messages
- Embed links
- Read message history
]
$color[#5865F2]
$sendMessage[]
```

### Link for this server

```bdfd
$title[🔗 Invite Link]
$description[
Share this link to invite the bot to **$serverName**:

```
$getBotInvite[$guildID]
```
]
$sendMessage[]
```

### Info + Invite command

```bdfd
$title[🤖 Bot Info]
$description[
**Name:** $botName
**Servers:** $guildCount
**Users:** $membersCount

[🔗 Invite the bot]($getBotInvite)
]
$thumbnail[$botAvatar]
$color[#57F287]
$sendMessage[]
```

## Notes

- The permissions in the link are defined in the Discord application configuration.
- The link only works if the bot is public or if the user has access to the server.
- For a server invite (not the bot's invite), use `$getServerInvite[]`.
