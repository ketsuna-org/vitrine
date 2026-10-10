---
layout: doc
title: $editIn[]
translation_key: docs
category: "Embed & Message"
function_name: editIn
syntax: $editIn[duration;content]
description: Schedules the editing of the message sent by the current command, after a delay, with the given new content.
---

# $editIn[] — Delayed Message Editing

`$editIn[]` schedules the editing of the message sent by the command after a given delay, replacing its text with the given content. It does not wait: the edit is applied once the response has been sent.

## Syntax

```
$editIn[duration;content]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `duration` | Yes | Delay before editing. Positive, at most 40 minutes. A plain number is read as seconds; units such as `s`, `m`, `h` are accepted (e.g. `3s`, `1m`). |
| `content` | Yes | New text of the message. Must not be empty ("Edited message must not be empty."). |

Exactly 2 arguments are required; there is no message ID parameter.

## Duration Format

| Format | Unit | Example |
|--------|-------|---------|
| `Xs` | Seconds | `5s`, `30s` |
| `Xm` | Minutes | `1m`, `10m` |
| `Xh` | Hours | `1h` (rejected if above 40 minutes) |

## Return value

An empty string. The edit is scheduled and applied to the response message of the command.

## Examples

### Loading indicator

```bdfd
⏳ Processing...
$editIn[3s;✅ Processing complete!]
```

### Starting message

```bdfd
Starting in 5 seconds...
$editIn[5s;🚀 Let's go!]
```

## Notes

- The maximum duration is 40 minutes; a zero, negative or unparsable duration raises "Duration must be positive and at most 40 minutes.".
- The edit targets the message sent as the command's response (the engine requires a scheduled-message output, otherwise "No scheduled message output configured.").
- To edit only the embed, use `$editEmbedIn[]`.
