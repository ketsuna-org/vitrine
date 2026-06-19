---
layout: doc
title: $repeatMessage[]
translation_key: docs
category: "Math & Text"
function_name: repeatMessage
syntax: $repeatMessage[count;message]
description: Sends a message multiple times. The message is repeated 'count' times in the channel.
parameters:
  - name: count
    type: integer
    required: true
    description: The number of times to send the message. Must be a positive integer. Large values may hit rate limits.
  - name: message
    type: string
    required: true
    description: The message content to repeat. Can contain placeholders, embeds, and other BDFD functions.
returns:
  type: none (action only)
  description: This function is an action — it sends messages and does not return a value inline.
related:
  - sendMessage
  - textSplit
  - sort
examples:
  - title: Send a message 3 times
    code: |
      $repeatMessage[3;Hello!]
      Result: Sends "Hello!" three times in the channel
  - title: Repeat with variable
    code: |
      $repeatMessage[$getUserVar[count];Spam detected!]
      Result: Sends the warning multiple times
  - title: Countdown
    code: |
      $repeatMessage[5;Processing...]
      Result: Sends "Processing..." five times (be careful with rate limits!)
---
# $repeatMessage — Repeat a Message

`$repeatMessage` sends the same message to the channel a specified number of times. It is an action function — it performs the sends directly without producing an inline return value.

## Syntax

```
$repeatMessage[count;message]
```

## Parameters

- **count** *(integer, required)* — How many times to send. Must be a positive integer.
- **message** *(string, required)* — The content to send. Can include embeds, variables, and other functions.

## Behavior

- **Action-only**: This function does not return a value. It sends messages to the channel as a side effect.
- Each repetition is sent as a separate Discord message.
- The function blocks until all messages are sent (subject to Discord rate limits).

## Usage

```
$repeatMessage[3;Hello World!]
```

Sends:
```
Hello World!
Hello World!
Hello World!
```

## Common Patterns

### Spam Command (Use with Caution)

```
$repeatMessage[5;$username sent a message!]
```

### Announcement Emphasis

```
$repeatMessage[3;$sendMessage[🎉 ATTENTION EVERYONE! 🎉]]
```

### Testing

```
$repeatMessage[10;Test message $getTextSplitIndex]
```

## Important Notes

- **Rate Limits**: Discord enforces rate limits on message sending (typically 5 messages per 5 seconds per channel). Sending too many messages too quickly may cause the bot to be rate-limited or the command to fail. Use `$repeatMessage` sparingly.
- **No return value**: Do not use `$repeatMessage` inside expressions or as arguments to other functions expecting a value.
- **Best for small counts**: Stick to small `count` values (1–5). For larger counts, consider sending a single message with repeated content using `$joinSplitText` or a loop.
- **Discord ToS**: Excessive message spamming may violate Discord's Terms of Service. Use responsibly.
- **Channel context**: Messages are sent to the channel where the command was triggered.
