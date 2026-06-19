---
layout: doc
title: $registerGuildCommands
translation_key: docs
category: "Moderation"
function_name: registerGuildCommands
syntax: $registerGuildCommands[guildID]
description: Registers the bot's slash commands on a specific server. Slash commands are immediately available after registration.
---

# $registerGuildCommands

The `$registerGuildCommands[]` function allows **registering the bot's slash commands** on a specific server.

## Syntax

```
$registerGuildCommands[guildID]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | The ID of the server where to register the slash commands. |

## Return Value

This function does not return a value.

## Behavior

- The slash commands defined in the bot are registered on the target server.
- Guild commands are available immediately (unlike global commands which can take up to 1 hour).
- The bot must have the `applications.commands` permission on the server.

## Examples

### Manual registration

```bdfd
$if[$checkContains[$userPerms;Administrator]==true]
  $registerGuildCommands[$guildID]
  $sendMessage[✅ Slash commands registered on this server!]
$else
  $sendMessage[❌ Permission denied.]
$endif
```

### Automatic registration

```bdfd
$registerGuildCommands[$guildID]
$sendMessage[Slash commands synced.]
```

### Multi-server registration (owner)

```bdfd
$if[$authorID==OWNER_ID]
  $registerGuildCommands[$message[1]]
  $sendMessage[Commands registered on server $message[1].]
$endif
```

## Notes

- Guild commands are faster to update than global commands.
- Useful for testing new commands before global deployment.
- To remove commands, use `$unregisterGuildCommands[]`.
- Maximum 100 slash commands per server.
