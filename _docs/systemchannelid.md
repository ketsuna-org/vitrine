---
layout: doc
title: $systemChannelID[]
translation_key: docs
category: "Entity Info"
function_name: systemChannelID
syntax: $systemChannelID
description: Returns the identifier (ID) of the system messages channel configured on the Discord server (welcome and boost messages). Raises an error if none is set.
---

# $systemChannelID[] — System Messages Channel

`$systemChannelID[]` returns the ID of the channel where Discord sends automatic system messages: new member announcements, Nitro boost messages, etc.

## Syntax

```
$systemChannelID
```

## Parameters

No parameters.

## Return Value

- **Type**: `string`
- The ID of the system channel of the current server.
- If the server has no system channel, the function does **not** return an empty string: it raises the error `No system channel set in this server.`

## Behavior

- `$systemChannelID` takes **no arguments** (any argument is refused with "Invalid argument count").
- The value is read from the server settings through the bot's channel service.

## Examples

### Simple Display

```bdfd
$sendMessage[📢 System messages are sent in <#$systemChannelID>]
```

### Configuration Log

```bdfd
$log[Configuration $serverName | System: $systemChannelID]
```

### Contextual Help Message

```bdfd
$if[$systemChannelID==$channelID]
$sendMessage[ℹ️ You are in the system messages channel. New members and boosts are announced here.]
$endif
```

## Notes

- When no system channel is set, the call raises an error; use `$try` / `$catch` if the command must keep running.
- This channel is distinct from the rules channel (`$rulesChannelID[]`).
