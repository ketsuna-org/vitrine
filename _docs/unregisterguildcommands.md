---
layout: doc
title: $unregisterGuildCommands
translation_key: docs
category: "Moderation"
function_name: unregisterGuildCommands
syntax: $unregisterGuildCommands[(guildID)]
description: Deletes all slash commands of the bot on a specific server. Global commands are not affected.
---

# $unregisterGuildCommands

The function `$unregisterGuildCommands` allows **deleting all slash commands** of the bot on a specific server.

## Syntax

```
$unregisterGuildCommands[(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | Optional - The ID of the server from which to delete the slash commands. By default, the current server. A non-numeric or non-positive ID raises the error `Invalid guild ID.` |

## Return Value

None (empty string). An error is raised if the operation fails (for example when guild command registration is not available in the current runtime, or when Discord rejects the request).

## Behavior

- Deletes ONLY guild commands, not global commands. Every slash command registered on that server for the bot is deleted, not only those created from the bot's command list.
- With `$registerGuildCommands`, only the bot's slash commands flagged as local-only are registered again, so the two functions are not exact inverses.

## Examples

### Manual Cleanup

```bdfd
$if[$checkUserPerms[$authorID;Administrator]==true]
  $unregisterGuildCommands[$guildID]
  $sendMessage[✅ Slash commands deleted from this server.]
$else
  $sendMessage[❌ Permission denied.]
$endif
```

### Reset

```bdfd
$unregisterGuildCommands[$guildID]
$wait[2]
$registerGuildCommands[$guildID]
$sendMessage[Slash commands reset successfully.]
```

### Cleanup Before Leaving

```bdfd
$if[$authorID==OWNER_ID]
  $unregisterGuildCommands[$message[1]]
  $botLeave[$message[1]]
  $sendMessage[Commands deleted and bot removed from server $message[1].]
$endif
```

## Notes

- Global commands are NOT affected by this function.
- To re-register, use `$registerGuildCommands` (only the bot's local-only slash commands are registered).
- Useful before leaving a server or to clean up old commands.
