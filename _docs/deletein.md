---
layout: doc
title: $deleteIn[]
translation_key: docs
category: "Embed & Message"
function_name: deleteIn
syntax: $deleteIn[duration]
description: Schedules the automatic deletion of a message after a specified duration. The message is deleted by the bot once the delay has elapsed.
---

# $deleteIn[] — Delayed Message Deletion

`$deleteIn[]` schedules the automatic deletion of the message after a given delay. Ideal for temporary notifications, ephemeral messages, or automatic cleanup.

## Syntax

```
$deleteIn[duration]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `duration` | Yes | Delay before deletion. Format: number + unit. |

## Duration Format

| Format | Unit | Example |
|--------|-------|---------|
| `Xs` | Seconds | `5s`, `30s`, `60s` |
| `Xm` | Minutes | `1m`, `5m`, `15m` |
| `Xh` | Hours | `1h`, `2h` |

## Return value

Schedules the delayed deletion of the message. The message is automatically deleted at expiry.

## Usage

### Temporary notification

```bdfd
$sendMessage[✅ Command executed successfully]
$deleteIn[5s]
```

### Ephemeral error message

```bdfd
$sendMessage[❌ Error: You do not have the required permission]
$deleteIn[10s]
```

### Self-clearing alert

```bdfd
$sendMessage[🔔 New update available!]
$deleteIn[30s]
```

### With embeds

```bdfd
$title[Temporary Message]
$description[This content will disappear in 10 seconds]
$color[#E74C3C]
$footer[Auto-deletion...]
$deleteIn[10s]
```

### Ephemeral welcome message

```bdfd
$sendMessage[Welcome $username! Please remember to read the rules.]
$deleteIn[1m]
```

## Notes

- `$deleteIn[]` deletes the **current** message (the one that was just sent).
- The maximum duration is generally 15 minutes.
- Once scheduled, the deletion cannot be cancelled.
- The deletion fails silently if the bot does not have the `MANAGE_MESSAGES` permission.
- Combine with `$sendMessage` for self-destructing messages.
