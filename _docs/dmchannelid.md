---
layout: doc
title: $dmChannelID
translation_key: docs
category: "Messages & DM"
function_name: dmChannelID
syntax: $dmChannelID[userID]
description: Retrieves the DM channel ID (private conversation) between the bot and a user. Automatically creates the DM channel if it does not exist yet.
---

# $dmChannelID

The `$dmChannelID[]` function returns the **DM channel ID** (private conversation) between the bot and a given user.

## Syntax

```
$dmChannelID[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user whose DM channel ID is requested. |

## Return value

- **Type**: Snowflake (string)
- The ID of the DM channel.
- Automatically creates the DM channel if necessary.

## Behavior

- Creates the DM channel if the conversation does not exist yet.
- Useful for combining with `$useChannel[]` or `$channelSendMessage[]`.
- Does not fail if the user has closed their DMs (the channel is created, but sending messages may fail).

## Examples

### Retrieving the DM ID

```bdfd
$let[dmChannel;$dmChannelID[$authorID]]
$sendMessage[Your private conversation with the bot: $dmChannel]
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

- The DM channel is persistent once created by Discord.
- To send a private message, `$dm[]` is simpler.
- Use `$dmChannelID[]` when you need the ID for other operations.
