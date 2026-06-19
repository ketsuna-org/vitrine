---
layout: doc
title: $getServerInvite
translation_key: docs
category: "Moderation"
function_name: getServerInvite
syntax: $getServerInvite[(guildID)]
description: Generates or returns a permanent invite for the server. If no ID is provided, it creates an invite for the current server.
---

# $getServerInvite

The function `$getServerInvite[]` generates or retrieves a Discord server invite.

## Syntax

```
$getServerInvite[(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | Optional - The ID of the server. Default: the server where the command is executed. |

## Return Value

- **Type**: String (URL)
- The server invite URL (format `https://discord.gg/CODE`).
- An empty string if the bot does not have the `CREATE_INSTANT_INVITE` permission.

## Behavior

- The bot must have the `CREATE_INSTANT_INVITE` permission on the target server.
- The created invite is generally permanent (without expiration).
- If an invite already exists, it may be reused.

## Examples

### Server invite link

```bdfd
$title[🌐 Server Invite]
$description[
Here is the invite link for **$serverName**:

```
$getServerInvite
```

Share it with your friends!
]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendMessage[]
```

### Display in a welcome message

```bdfd
$title[👋 Welcome to $serverName!]
$description[
**Invite your friends:**
$getServerInvite

We are now **$membersCount** members!
]
$color[#57F287]
$sendMessage[]
```

### Complete server information

```bdfd
$title[📊 Server Information]
$description[
**Name:** $serverName
**Members:** $membersCount
**Boosts:** Level $boostLevel
**Invite:** $getServerInvite
]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendMessage[]
```

## Notes

- The created invite uses the channel where the command is executed (or the system channel).
- To invite the bot itself, use `$getBotInvite[]`.
- To get information about an invite, use `$getInviteInfo[]`.
