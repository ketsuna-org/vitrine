---
layout: doc
title: $suppressErrors
translation_key: docs
category: "Control Flow"
function_name: suppressErrors
syntax: $suppressErrors[(message)]
description: Replaces the error response of the script with a text message (or with nothing when called without argument).
---

`$suppressErrors` replaces the error response of the script with a text of your choice (or with nothing).

## Syntax

```text
$suppressErrors[(message)]
```

| Parameter | Description |
|---|---|
| `message` | Optional. Text sent as the response instead of the error. Without an argument (or `$suppressErrors` alone) the replacement is empty, so nothing is sent. |

`$suppressErrors` takes 0 or 1 argument.

## How It Works

- When called, it registers the replacement for the **current script**. Nothing happens until an error occurs.
- When a function later raises an error, the script stops, the response written so far (text, embeds, components) is **discarded**, and the replacement text is sent as the response instead of the error message.
- Messages already sent with `$sendMessage` stay sent.
- It also replaces the message of `$onlyIf[condition;message]` and `$onlyIfMessageContains[...]`.
- Calling `$embedSuppressErrors` after it cancels it (the last one wins), and the other way round.
- Errors detected before the script runs (for example a wrong number of arguments) and errors raised **before** `$suppressErrors` is executed are not intercepted.

## Scope

The setting applies to the current script only: each script starts without any suppression.

## Relationship with Other Functions

| Function | Effect |
|----------|-------------------|
| `$suppressErrors[(message)]` | Errors are replaced by a text message (empty if no argument) |
| `$embedSuppressErrors[...]` | Errors are replaced by a custom embed |
| `$suppressErrorLogging` | Sets a flag that nothing in the engine reads (no visible effect) |

## When Not to Use

- **During development**: error messages are needed for debugging.
- **As a substitute for validation**: prefer `$onlyIf` guards.

## Examples

### User-friendly fallback message

```bdfd
$suppressErrors[An unexpected error occurred while executing this command.]
$title[Safe Execution]
$description[Result: $sum[1;oops]]
$color[#5865F2]
```

Here `$sum[1;oops]` fails, so the response is the fallback text instead of the embed.

### Silent failure

```bdfd
$suppressErrors
Result: $sum[1;oops]
```

Nothing is sent.
