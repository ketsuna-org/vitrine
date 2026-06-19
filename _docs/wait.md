---
layout: doc
title: $wait[]
translation_key: docs
category: "Control Flow"
function_name: wait
syntax: $wait[duration]
description: Pauses command execution for a specified duration. Uses BotCreatorActionType.wait to suspend processing.
---
$wait is a simple but essential function for introducing timed delays in command execution. It suspends the command for the exact duration specified, then resumes on the next line.

## How It Works

1. `$wait[duration]` is encountered during execution.
2. The command **pauses** for the specified duration.
3. After the delay, execution continues with the next line.

All variables, scopes, and states are preserved during the wait. The delay is applied server-side and does not consume resources on the client.

## Duration Format

| Format | Example | Meaning |
|--------|---------|---------|
| Seconds | `1s`, `10s`, `2s` | Exactly N seconds |
| Milliseconds | `500ms`, `100ms`, `2000ms` | Exactly N milliseconds |
| Minutes | `1m`, `2m` | Exactly N minutes |
| Default (no suffix) | `3` | Treated as "3s" (seconds) |

The default unit when no suffix is provided is seconds. `$wait[3]` is equivalent to `$wait[3s]`.

## Important: Use with $defer

If your command uses `$wait` and the total execution time may exceed Discord's 3-second interaction timeout, you **must** call `$defer` before any `$wait`:

```
$defer
$wait[5s]
$sendMessage[Done after 5 seconds.]
```

Without `$defer`, Discord will show "This interaction failed" because no response was sent within the 3-second window.

## When to Use

- **Sequential messaging**: Send multiple messages with delays between them.
- **Countdowns**: Create a countdown effect with multiple `$wait` and `$sendMessage` calls.
- **Rate limiting simulation**: Slow down automated processes.
- **UI pacing**: Make bot responses feel more natural by introducing human-like delays.

## When Not to Use

- **Waiting for user input**: Use `$awaitFunc` instead — it resumes on an actual event rather than a fixed timer.
- **Cooldown enforcement**: Use `$cooldown` instead — it persists across command invocations.
- **Long delays (>15 minutes)**: Discord interaction tokens expire, so very long waits may fail. Use alternative approaches like scheduled tasks or workflows.
