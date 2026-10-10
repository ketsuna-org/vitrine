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
| `guildID` | Optional - The ID of the server from which to delete the slash commands. By default, the current server. An invalid ID raises an error. |

## Return Value

None (empty string). An error is raised if the operation fails.

## Behavior

- Deletes ONLY guild commands, not global commands.

## Examples

### Manual Cleanup

```bdfd
$if[$checkContains[$userPerms;Administrator]==true]
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
- To re-register, use `$registerGuildCommands[]`.
- Useful before leaving a server or to clean up old commands.
