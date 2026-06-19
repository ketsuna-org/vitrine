---
layout: doc
title: $replyIn[]
translation_key: docs
category: "Embed & Message"
function_name: replyIn
syntax: $replyIn[duration]
description: Schedules a delayed response to a message. The bot will send the content defined after $replyIn as a response to the original message after the specified delay.
---

# $replyIn[] — Delayed Response

`$replyIn[]` schedules the sending of a response to the message after a delay. The content defined after `$replyIn[]` will be sent as a reply to the original message.

## Syntax

```
$replyIn[duration]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `duration` | Yes | The delay before the response. Format: number + unit. |

## Duration Format

| Format | Unit | Example |
|--------|-------|---------|
| `Xs` | Seconds | `3s`, `10s` |
| `Xm` | Minutes | `1m`, `5m` |
| `Xh` | Hours | `1h` |

## Return Value

Schedules a delayed response. The subsequent content is sent as a reply to the triggering message.

## Examples

### Simple delayed response

```bdfd
$replyIn[3s]
$sendMessage[Please wait, processing your request...]
```

### Information after delay

```bdfd
$replyIn[5s]
$title[Server Information]
$description[**Name:** $serverName\n**Members:** $membersCount]
$color[#5865F2]
$footer[Requested by $username]
```

### Simulation of processing

```bdfd
$replyIn[2s]
$sendMessage[🔍 Search in progress...]
$replyIn[5s]
$sendMessage[✅ Result found: $var[result]]
```

### Scheduled notifications

```bdfd
$replyIn[1m]
$sendMessage[⏰ Reminder: your meeting starts in 5 minutes!]
```

### With embeds

```bdfd
$replyIn[4s]
$title[Analysis Complete]
$description[Here is the analysis requested by $username]
$addField[Status;Completed;yes]
$addField[Execution time;$var[exec_time]ms;yes]
$color[#27AE60]
```

## Notes

- The message is sent as a **reply** to the original message.
- The maximum recommended duration is 15 minutes.
- Multiple successive `$replyIn[]` calls will send several delayed responses.
- Unlike `$editIn[]`, a new message is created instead of editing the existing one.
- If the original message is deleted before the delay expires, the response may fail.
