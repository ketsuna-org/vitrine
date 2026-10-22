---
layout: doc
title: $registerGuildCommands
translation_key: docs
category: "Moderation"
function_name: registerGuildCommands
syntax: $registerGuildCommands[name]
description: Registers the bot's local-only slash commands on the current server, all of them or only those named.
---

# $registerGuildCommands

The `$registerGuildCommands[]` function allows **registering the bot's slash commands** on the current server: all the local-only ones, or only those whose names are given.

## Syntax

```
$registerGuildCommands[name]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | Optional, repeatable (`$registerGuildCommands[ping;help]`). The name of a slash command of the bot to register, matched exactly (case-sensitive). Empty arguments are ignored. Without any name, every local-only command is registered. |

The server is always the current one. For compatibility, a **single argument made only of digits** (`$registerGuildCommands[123456789012345678]`) is read as a server ID instead of a command name; a non-positive value then raises `Invalid guild ID.`.

## Return Value

This function does not return a value.

## Behavior

- The slash commands (chat input) of the bot that are marked as local-only are registered on the target server, one by one, with their name, description and options (name, type, description, required flag). Commands that are not marked local-only are not touched, **even when named**: `$registerGuildCommands[ping]` does nothing if `ping` is not local-only, and a name that matches no command registers nothing, without an error.
- If the guild commands cannot be registered because the bot store is not available, the error `Guild command registration is not configured` is raised.
- If the Discord call fails for one command, the error `Failed to register <name>: ...` is raised and the following commands are not registered.
- Without a server ID argument the command needs a current server; outside a server an error (`Missing guildId`) is raised.

## Examples

### Register named commands

```bdfd
$registerGuildCommands[ping;help]
$sendMessage[The commands ping and help are registered on this server.]
```

### Manual registration

```bdfd
$if[$isAdmin[$authorID]==true]
  $registerGuildCommands
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

### Registration on another server by ID (owner)

```bdfd
$if[$authorID==OWNER_ID]
  $registerGuildCommands[$message[1]]
  $sendMessage[Commands registered on server $message[1].]
$endif
```

This works only because `$message[1]` is a lone numeric argument, read as a server ID.

## Notes

- To remove the commands of a server, use `$unregisterGuildCommands[name]` (without name it deletes every slash command registered on that server, not only the local-only ones).
