---
layout: doc
title: $dmChannelID
translation_key: docs
category: "Embed & Message"
function_name: dmChannelID
syntax: $dmChannelID[(userID)]
description: Returns the DM channel ID stored in the command context for the user (variable user.dmChannelId), or an empty string if none is set. Does not create a DM channel.
---

# $dmChannelID

The `$dmChannelID[]` function returns the **DM channel ID** (private conversation) between the bot and a given user.

## Syntax

```
$dmChannelID[(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional. Accepted (0 or 1 argument) but **ignored** by the engine. |

## Return value

- **Type**: Snowflake (string)
- The value of the context variable `user.dmChannelId`, or an empty string if it is not set.
- The engine does not create or look up a DM channel.

## Behavior

- The user ID argument does not change the result: the value comes from the command context (`user.dmChannelId`).
- When no DM channel ID is present in the context, the result is empty.

## Examples

### Retrieving the DM ID

```bdfd
$var[dmChannel;$dmChannelID[$authorID]]
$sendMessage[Your private conversation with the bot: $var[dmChannel]]
```

### Sending to the DM via useChannel

```bdfd
$useChannel[$dmChannelID[$authorID]]
$sendMessage[This message is sent in private.]
```

### Logging of DM channel

```bdfd
$log[DM opened with <@$authorID> - Channel: $dmChannelID[$authorID]]
```

## Notes

- To send a private message, `$dm` is simpler.
