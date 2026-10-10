---
layout: doc
title: $deleteIn[]
translation_key: docs
category: "Embed & Message"
function_name: deleteIn
syntax: $deleteIn[duration]
description: Schedules the deletion of the command's main response after a delay (at most 40 minutes).
---

# $deleteIn[] — Delayed Message Deletion

`$deleteIn[]` schedules the deletion of the command's **main response** (the text, embeds and components built by the command itself) after a given delay. Ideal for temporary notifications or automatic cleanup.

## Syntax

```
$deleteIn[duration]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `duration` | Yes | Delay before deletion. A plain number is a number of seconds (decimals allowed); otherwise one or more `number + unit` parts, such as `5s`, `1m30s`, `2h`. |

## Duration Format

| Unit | Accepted spellings | Example |
|-------|-------|---------|
| milliseconds | `ms`, `millisecond(s)` | `500ms` |
| seconds | `s`, `sec`, `second(s)` | `5s`, `30s` |
| minutes | `m`, `min`, `minute(s)` | `1m`, `15m` |
| hours | `h`, `hour(s)` | `1h` |
| days, weeks, years | `d`/`day(s)`, `w`/`week(s)`, `y`/`year(s)` | `1d` |

Parts can be combined (`1m30s`). The total delay must be greater than zero and **at most 40 minutes**; otherwise the call fails with `Duration must be positive and at most 40 minutes.` (so `1h` is refused).

## Return value

An empty string. The deletion is registered on the pending response and runs once the response has been sent and the delay has elapsed.

## Which message is deleted

`$deleteIn[]` is attached to the command's main response, not to the messages sent with `$sendMessage[]` (which are separate messages that do not consume the response). If the command has no main response (no text, embed or component outside of `$sendMessage`), there is nothing to delete and the call has no effect. Functions that send the pending response early (`$useChannel[]`, `$sendEmbedMessage[]`, `$channelSendMessage[]`) send it first, and the deletion then applies to that message.

## Examples

### Temporary notification

```bdfd
✅ Command executed successfully
$deleteIn[5s]
```

### Combined duration

```bdfd
Welcome $username! Please remember to read the rules.
$deleteIn[1m30s]
```

### With embeds

```bdfd
$title[Temporary Message]
$description[This content will disappear in 10 seconds]
$color[#E74C3C]
$footer[Auto-deletion...]
$deleteIn[10s]
```

## Notes

- `$deleteIn[]` takes exactly one argument.
- To delete an existing message at once, use `$deleteMessage[channelID;messageID]`; to delete the triggering message use `$deleteCommand`.
- If the deletion fails when the timer fires (for example the message no longer exists), the script is not affected: the error is not raised in the command.
