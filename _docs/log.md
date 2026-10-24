---
layout: doc
title: $log[]
translation_key: docs
category: "Math & Text"
function_name: log
syntax: $log[message;level]
description: Records a message in the execution log, with an optional level (success, info, warning or error). It returns nothing and sends nothing to Discord.
---

# $log[]

The function `$log[]` hands a text message to the host's execution log. It is a debugging aid: it is **not** a mathematical function, and it has no relation to logarithms.

## Syntax

```
$log[message;level]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `message` | text | Yes | The text to record. It is evaluated like any other argument. |
| `level` | text | No | `success`, `info`, `warning` or `error` (case-insensitive, spaces around are ignored). `info` by default; an empty level is `info`. |

## Behavior

- Takes one or two arguments; three or more are rejected ("Invalid argument count").
- Any other level raises the error "Log level must be success, info, warning or error." and nothing is recorded.
- Always returns an empty string, so it never adds anything to the message.
- It does not send anything to the channel.
- The level is only checked: the host receives the message alone and does not tell the levels apart.
- The message is only recorded when the host that runs the script provides a log collector (the command sandbox collects the messages in its list of logs). When no collector is provided, the call does nothing.

## Examples

### Record a value while debugging

```bdfd
$log[Command run by $username]
Done!
```

### Record with a level

```bdfd
$log[Payment refused for $authorID;error]
```

## Notes

- There is no logarithm function: `$calculate[]` does not support `log`, `ln` or `log10` either.
- See also `$logQuota` for the remaining log quota.
