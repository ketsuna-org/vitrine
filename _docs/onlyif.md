---
layout: doc
title: $onlyIf[]
translation_key: docs
category: "Control Flow"
function_name: onlyIf
syntax: $onlyIf[condition] or $onlyIf[condition;errorMessage]
description: Condition guard that stops the script if the condition is false. An optional message replaces the response.
---

# $onlyIf[] — Condition Guard

`$onlyIf` is a guard: if the condition is true the script continues; if it is false the script stops. An optional message replaces the response.

## Syntax

```text
$onlyIf[condition]
$onlyIf[condition;errorMessage]
```

## Parameters

| Parameter | Description |
|---|---|
| `condition` | `true`, `false`, or a comparison (`==`, `!=`, `>=`, `<=`, `>`, `<`). If both sides are numbers the comparison is numeric, otherwise it is a text comparison. Anything else (for example `1` or an empty condition) is an error: `Invalid condition: <condition>.` |
| `errorMessage` | Optional. Text that replaces the response when the condition is false. |

`$onlyIf` takes 1 or 2 arguments; a third argument is refused.

## How It Works

1. The `condition` is evaluated.
2. If it is **true**, nothing happens and the script continues; the function returns an empty string.
3. If it is **false**, the script stops immediately (the rest of the script does not run, including inside loops and conditions).

## Without a message

```text
$onlyIf[condition]
```

The script stops, but what was already written (text, embeds, components) is still sent as the response. For example `A$onlyIf[false]B` sends `A`. If nothing was written, nothing is sent.

## With a message

```text
$onlyIf[condition;errorMessage]
```

The response written so far (text, embeds, components) is **discarded** and replaced by `errorMessage`, which is sent as the response (it is not sent to the channel separately). Messages already sent with `$sendMessage` are not affected. An empty `errorMessage` (`$onlyIf[cond;]`) discards the response and sends nothing.

If `$suppressErrors[text]` was used before, `errorMessage` is replaced by that text.

## Examples

### Input validation

```bdfd
$onlyIf[$message>=1;The number must be >= 1.]
$onlyIf[$message<=100;The number must be <= 100.]
Valid number: $message
```

### Channel restriction

```bdfd
$onlyIf[$channelID==123456789012345678;This command can only be used in <#123456789012345678>.]
```

## Comparison with $if / $stop

Without `$onlyIf`:

```text
$if[$message<1]
The number must be >= 1.
$stop
$endif
```

With `$onlyIf` (equivalent when nothing else was written before):

```text
$onlyIf[$message>=1;The number must be >= 1.]
```

The difference: `$stop` keeps what was already written, while `$onlyIf[condition;message]` discards it.
