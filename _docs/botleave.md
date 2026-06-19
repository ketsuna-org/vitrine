---
layout: doc
title: $botLeave
translation_key: docs
category: "Moderation"
function_name: botLeave
syntax: $botLeave[(guildID)]
description: Makes the bot leave a server. If no ID is provided, the bot leaves the server where the command was executed.
---

# $botLeave

The `$botLeave[]` function **makes the bot leave a server**. This is an irreversible action that removes the bot from the target server.

## Syntax

```
$botLeave[(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | Optional - The ID of the server to leave. By default, the current server. |

## Return value

This function does not return a value.

## Behavior

- The bot immediately leaves the specified server.
- **Irreversible action**: All bot data on this server will be lost.
- If executed without `guildID`, the bot leaves the server where the command was run.

## Examples

### Leave the current server

```bdfd
$if[$checkContains[$userPerms;Administrator]==true]
  $sendMessage[Goodbye! The bot is leaving this server.]
  $botLeave
$else
  $sendMessage[Only administrators can use this command.]
$endif
```

### Leave a specific server (owner only)

```bdfd
$if[$authorID==OWNER_ID]
  $let[targetGuild;$message[1]]
  $if[$targetGuild!=]
    $botLeave[$targetGuild]
    $sendMessage[Bot removed from the server $targetGuild.]
  $else
    $sendMessage[Usage: !leave <guildID>]
  $endif
$else
  $sendMessage[Reserved for the bot owner.]
$endif
```

### Automatic Cleanup

```bdfd
$if[$membersCount<5]
  $channelSendMessage[$channelID;This server has fewer than 5 members. The bot will leave.]
  $botLeave
$endif
```

## Notes

- **Irreversible action**: Use with extreme caution.
- Protect this command with strict permission checks.
- All user data linked to this server will become inaccessible.
- The bot cannot rejoin a server via command (requires an invite link).
