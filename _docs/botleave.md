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
| `guildID` | Optional - The ID of the server to leave. By default, the current server. If the argument is written it must be a positive number: `$botLeave[]` (empty) or a non-numeric value raises `Invalid guild ID.` |

## Return value

This function does not return a value.

## Behavior

- The bot leaves the specified server when the function runs (the Discord call is made immediately, before the rest of the script).
- If executed without `guildID`, the bot leaves the server where the command was run; outside a server, an error is raised (`Leaving a guild requires a guild ID.`).
- The engine does not check who runs the command: restrict it yourself.

## Examples

### Leave the current server

```bdfd
$if[$checkUserPerms[$authorID;Administrator]==true]
  $sendMessage[Goodbye! The bot is leaving this server.]
  $botLeave
$else
  $sendMessage[Only administrators can use this command.]
$endif
```

### Leave a specific server (owner only)

```bdfd
$if[$authorID==OWNER_ID]
  $var[targetGuild;$message[1]]
  $if[$var[targetGuild]!=]
    $botLeave[$var[targetGuild]]
    $sendMessage[Bot removed from the server $var[targetGuild].]
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

- **Irreversible action**: the bot must be invited again to rejoin. Use with extreme caution.
- Protect this command with strict permission checks.
