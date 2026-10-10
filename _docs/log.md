---
layout: doc
title: $log[]
translation_key: docs
category: "Math & Text"
function_name: log
syntax: $log[message]
description: Records a message in the execution log. It returns nothing and sends nothing to Discord.
---

# $log[]

The function `$log[]` hands a text message to the host's execution log. It is a debugging aid: it is **not** a mathematical function, and it has no relation to logarithms.

## Syntax

```
$log[message]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `message` | text | Yes | The text to record. It is evaluated like any other argument. |

## Behavior

- Takes exactly one argument; two or more arguments are rejected ("Invalid argument count").
- Always returns an empty string, so it never adds anything to the message.
- It does not send anything to the channel.
- The message is only recorded when the host that runs the script provides a log collector (the command sandbox collects the messages in its list of logs). When no collector is provided, the call does nothing.

## Examples

### Record a value while debugging

```bdfd
$log[Command run by $username]
Done!
```

## Notes

- There is no logarithm function: `$calculate[]` does not support `log`, `ln` or `log10` either.
- See also `$logQuota` for the remaining log quota.
