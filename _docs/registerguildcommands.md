---
layout: doc
title: $registerGuildCommands
translation_key: docs
category: "Moderation"
function_name: registerGuildCommands
syntax: $registerGuildCommands[(guildID)]
description: Registers the bot's local-only slash commands on a server (the current server by default).
---

# $registerGuildCommands

The `$registerGuildCommands[]` function allows **registering the bot's slash commands** on a server.

## Syntax

```
$registerGuildCommands[(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | Optional. The ID of the server where to register the slash commands. If omitted or empty, the current server is used. A non-numeric or non-positive value raises an error. |

## Return Value

This function does not return a value.

## Behavior

- The slash commands (chat input) of the bot that are marked as local-only are registered on the target server.
- If neither the argument nor the current context gives a server, an error is returned ("No guildId provided").

## Examples

### Manual registration

```bdfd
$if[$isAdmin[$authorID]==true]
  $registerGuildCommands[$guildID]
  $sendMessage[✅ Slash commands registered on this server!]
$else
  $sendMessage[❌ Permission denied.]
$endif
```

### Registration on the current server

```bdfd
$registerGuildCommands
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

- To remove the commands of a server, use `$unregisterGuildCommands[(guildID)]`.
