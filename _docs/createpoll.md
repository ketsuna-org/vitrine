---
layout: doc
title: $createPoll
translation_key: docs
category: "Polls"
function_name: createPoll
syntax: $createPoll[channelID;question;durationHours;allowMultiselect;answer1;answer2;...]
description: Posts a Discord poll in a channel and returns the message ID.
---

# $createPoll

Posts a Discord poll in a channel and returns the message ID. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching block.

## Syntax

```
$createPoll[channelID;question;durationHours;allowMultiselect;answer1;answer2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Channel ID (digits only). Optional: empty means the current channel. |
| `question` | **Required.** The poll question. |
| `durationHours` | Duration in hours, 1 to 168. Empty means 24. |
| `allowMultiselect` | `true` to let members pick several answers, otherwise `false`. |
| `answer1;answer2;...` | **Required**, 1 to 10 answers. |

## Return Value

- **Type**: String
- The ID of the message holding the poll.

## Behavior

- At least one answer is required (`$createPoll` needs 5 arguments or more).
- The bot needs Send Messages in the channel.
- A failure (no permission, not a text channel, too many answers) is a runtime error you can catch with `$try`.

## Examples

```bdfd
$createPoll[;What should we play tonight?;24;false;Minecraft;Valorant;Chess]
```
