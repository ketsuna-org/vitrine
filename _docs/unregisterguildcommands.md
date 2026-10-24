---
layout: doc
title: $unregisterGuildCommands
translation_key: docs
category: "Moderation"
function_name: unregisterGuildCommands
syntax: $unregisterGuildCommands[name]
description: Deletes the slash commands of the bot on the current server, all of them or only those named. Global commands are not affected.
---

# $unregisterGuildCommands

The function `$unregisterGuildCommands` allows **deleting the slash commands** of the bot on the current server: all of them, or only those whose names are given.

## Syntax

```
$unregisterGuildCommands[name]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | Optional, repeatable (`$unregisterGuildCommands[ping;help]`). The name of a guild slash command to delete, matched exactly (case-sensitive). Empty arguments are ignored. Without any name, every slash command of the server is deleted. |

The server is always the current one. For compatibility, a **single argument made only of digits** is read as a server ID instead of a command name; a non-positive value then raises `Invalid guild ID.`.

## Return Value

None (empty string). An error is raised if the operation fails (for example when guild command registration is not available in the current runtime, or when Discord rejects the request).

## Behavior

- Deletes ONLY guild commands, not global commands. Without names, every slash command registered on that server for the bot is deleted, not only those created from the bot's command list. With names, only the guild commands with those exact names are deleted (a name that matches nothing deletes nothing, without an error).
- With `$registerGuildCommands`, only the bot's slash commands flagged as local-only are registered again, so the two functions are not exact inverses.

## Examples

### Delete named commands

```bdfd
$unregisterGuildCommands[ping;help]
$sendMessage[The commands ping and help are removed from this server.]
```

### Manual Cleanup

```bdfd
$if[$checkUserPerms[$authorID;Administrator]==true]
  $unregisterGuildCommands
  $sendMessage[✅ Slash commands deleted from this server.]
$else
  $sendMessage[❌ Permission denied.]
$endif
```

### Reset

```bdfd
$unregisterGuildCommands
$wait[2]
$registerGuildCommands
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
- To re-register, use `$registerGuildCommands[name]` (only the bot's local-only slash commands are registered).
- Useful before leaving a server or to clean up old commands.
