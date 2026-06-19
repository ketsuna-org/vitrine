---
layout: doc
title: $ping[]
translation_key: docs
category: "Misc"
function_name: ping
syntax: $ping
description: Returns the bot's WebSocket latency in milliseconds.
---

# $ping[]

The `$ping[]` function returns the bot's current WebSocket latency, expressed in milliseconds (ms). This value represents the communication time between the bot and Discord's servers.

## Syntax

```
$ping
```

> **Note:** This function takes no parameters.

## Return Value

A number representing the WebSocket latency in milliseconds.

## Interpretation

| Latency | Status |
|---------|--------|
| < 100 ms | Excelslow |
| 100-200 ms | Good |
| 200-400 ms | Average |
| > 400 ms | High |

## Examples

### Simple ping command

```bdfd
🏓 Pong! Latency: $ping ms
```

### Detailed embed

```bdfd
$title[🏓 Pong!]
$description[WebSocket latency: **$ping ms**]
$color[$if[$ping<100]#00FF00$elseif[$ping<200]#FFFF00$else#FF0000$endif]
$footer[🤖 $username]
```

### Visual indicator

```bdfd
$if[$ping<100]
🟢 | $ping ms
$elseif[$ping<200]
🟡 | $ping ms
$else
🔴 | $ping ms
$endif
```

## Notes

- This is the **WebSocket** latency (real-time connection), not the HTTP response time.
- Latency may vary depending on Discord server load and the location of the server hosting the bot.
- To check the bot's uptime, use `$uptime[]`.
