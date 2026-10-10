---
layout: doc
title: $messageTimestamp
translation_key: docs
category: "Entity Info"
function_name: messageTimestamp
syntax: $messageTimestamp[(channelID;messageID)]
description: Returns the creation timestamp of the triggering message (host-supplied, milliseconds for message events), or the creation time in seconds of a given message.
---

# $messageTimestamp

The function `$messageTimestamp` returns the creation **timestamp** of a message. It has two forms with **different units**.

## Syntax

```
$messageTimestamp[(channelID;messageID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | *(Optional, but only together with `messageID`)* The ID of the channel containing the message. |
| `messageID` | *(Optional, but only together with `channelID`)* The ID of the message. |

Use either no argument or both arguments.

## Return Value

| Form | Description |
|---|---|
| `$messageTimestamp` | The text of the `message.timestamp` context variable supplied by the host, or an empty string if there is none. For message events the bot runner supplies the creation time of the triggering message in **milliseconds** since the Unix epoch. |
| `$messageTimestamp[channelID;messageID]` | The creation time in **seconds** (Unix time) computed from the message ID (Discord snowflake). Invalid IDs raise `Invalid Discord ID.`; the message is fetched from Discord and a channel that cannot hold messages raises `Channel does not support messages.` |

## Examples

### Display the raw timestamp

```bdfd
$sendMessage[Message timestamp: $messageTimestamp]
```

### Display as a Discord date

```bdfd
$sendMessage[Message sent on <t:$floor[$divide[$messageTimestamp;1000]]:f>]
```

### Calculate the age of the message

```bdfd
$sendMessage[Message age: $floor[$divide[$sub[$getTimestampMs;$messageTimestamp];1000]] seconds.]
```

### Display in Discord relative format

```bdfd
$sendMessage[Message sent <t:$floor[$divide[$messageTimestamp;1000]]:R>]
```

## Notes

- Without argument the value is not computed by the engine, so its unit is whatever the host supplied (milliseconds for message events); with the two arguments the unit is seconds. The examples below use the argument-less form.
- Use it in a Discord timestamp (`<t:seconds:format>`) for a human-readable display.
- `$getTimestampMs` returns the current timestamp in milliseconds, so `$sub[$getTimestampMs;$messageTimestamp]` is an age in milliseconds when the host supplies milliseconds.
- For the edit timestamp, use `$messageEditedTimestamp`.

