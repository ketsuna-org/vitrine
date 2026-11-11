---
layout: doc
title: $channelMessageCount
translation_key: docs
category: "Moderation"
function_name: channelMessageCount
syntax: $channelMessageCount[channelID;(minutes);(humansOnly)]
description: "Counts the messages sent in a channel recently, without reading their text."
---

# $channelMessageCount

Counts the messages sent in a channel recently, without reading their text.

## Syntax

```
$channelMessageCount[channelID;(minutes);(humansOnly)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | ID of the channel. |
| `minutes` | Optional. Window in minutes, 60 by default, 1440 at most. |
| `humansOnly` | Optional. `yes` ignores bots and webhooks; default `no`. |

## Return Value

- string.

## Usage

```
$channelMessageCount[123;10] → "42"
```

## Example

```bdfd
$if[$channelMessageCount[$getGuildVar[town_channel];10;yes]>=20]A monster appears!$endif
```

## Notes

The bot never reads the text, so the Message Content intent is not needed. Counting starts when the bot starts and is kept in memory. JavaScript: `bc.activity.messageCount(channelId, minutes, humansOnly)`.
