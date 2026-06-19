---
layout: doc
title: $editIn[]
translation_key: docs
category: "Embed & Message"
function_name: editIn
syntax: $editIn[duration;(messageId)]
description: Schedules the editing of a message after a specified delay. The current message will be replaced by the new content defined after the delay.
---

# $editIn[] — Delayed Message Editing

`$editIn[]` schedules the automatic editing of a message after a given delay. This is useful for creating self-updating messages, countdowns, or state transitions.

## Syntax

```
$editIn[duration;(messageId)]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `duration` | Yes | Delay before editing. Format: number + unit (`s`, `m`, `h`). |
| `messageId` | No | ID of the target message. If omitted, the current message. |

## Duration Format

| Format | Unit | Example |
|--------|-------|---------|
| `Xs` | Seconds | `5s`, `30s` |
| `Xm` | Minutes | `1m`, `10m` |
| `Xh` | Hours | `1h`, `2h` |

## Return value

Schedules the delayed editing. The new content is defined after the call to `$editIn[]`.

## Usage

### Loading indicator

```bdfd
$sendMessage[⏳ Processing...]
$editIn[3s]
$sendMessage[✅ Processing complete!]
```

### Countdown

```bdfd
$sendMessage[Starting in 5 seconds...]
$editIn[1s]
$sendMessage[Starting in 4 seconds...]
$editIn[2s]
$sendMessage[Starting in 3 seconds...]
$editIn[3s]
$sendMessage[Starting in 2 seconds...]
$editIn[4s]
$sendMessage[Starting in 1 second...]
$editIn[5s]
$sendMessage[🚀 Let's go!]
```

### Update after action

```bdfd
$sendMessage[Search in progress... 🔍]
$editIn[2s]
$title[Search Results]
$description[3 results found for "$var[query]"]
$color[#5865F2]
```

### With specific messageId

```bdfd
$var[msgId;$sendMessage[Status: Pending...;yes]]
$editIn[10s;$var[msgId]]
$sendMessage[Status: Completed ✅]
```

## Notes

- The maximum duration is generally 15 minutes (BDFD/Discord limitation).
- The content after `$editIn[]` completely replaces the content of the target message.
- If `messageId` is omitted, the message currently being sent is targeted.
- To edit only the embed without touching the text, use `$editEmbedIn[]`.
