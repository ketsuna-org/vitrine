---
layout: doc
title: $replyIn[]
translation_key: docs
category: "Embed & Message"
function_name: replyIn
syntax: $replyIn[duration]
description: Pauses the execution of the command for the given duration (at least 1 second, at most 40 minutes). It does not reply to anything by itself.
---

# $replyIn[] — Delay

`$replyIn[]` **waits** for the given duration, then the command continues with the code that follows. It does not send or schedule a reply by itself and does not change how the following content is sent: it behaves like `$wait[]`, with a minimum of one second.

## Syntax

```
$replyIn[duration]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `duration` | Yes | The time to wait. A plain number is read as seconds; otherwise `number + unit` parts (`3s`, `1m`, `1m30s`). Must be at least 1 second and at most 40 minutes. |

## Duration Format

| Format | Unit | Example |
|--------|-------|---------|
| `X` | Seconds (plain number) | `3` |
| `Xs` | Seconds | `3s`, `10s` |
| `Xm` | Minutes | `1m`, `5m` |
| `Xh` | Hours | `1h` (rejected: above 40 minutes) |

Longer spellings (`sec`, `minutes`, ...) and the units `d`, `w`, `y` are parsed too, but the total must stay within 40 minutes. An invalid or out-of-range duration raises `Duration must be positive and at most 40 minutes, with a minimum of one second.`

## Return Value

An empty string, returned after the delay has elapsed.

## Examples

### Wait between two messages

```bdfd
$sendMessage[Please wait, processing your request...]
$replyIn[3s]
$sendMessage[Done!]
```

### Delay before the final response

```bdfd
$replyIn[5s]
Here is the information, 5 seconds later.
```

## Notes

- The wait happens during the execution of the command, at the position of the call; the command is not finished until the delay is over.
- The result does not depend on a reply: to reply to a message use `$reply`.
- To delay the deletion or the edit of the response without blocking, use `$deleteIn[]`, `$editIn[]` or `$editEmbedIn[]`.
- `$wait[]` does the same without the one-second minimum.
