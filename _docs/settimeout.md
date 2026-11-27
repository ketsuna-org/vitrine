---
layout: doc
title: $setTimeout[]
translation_key: docs
category: "Utilities"
function_name: setTimeout
syntax: $setTimeout[code;(time);(name)]
description: "Runs code once after a delay, as the bot, with the server, channel and author of the call. Timers live in the bot process (a restart cancels them): 24 hours at most, 50 timers per bot. A name already used replaces the earlier timer."
---
# $setTimeout — Runs code once after a delay, as the bot, with the server, channel and author of the call. Timers live in the bot process (a restart cancels them): 24 hours at most, 50 timers per bot. A name already used replaces the earlier timer.

## Syntax

```
$setTimeout[code;(time);(name)]
```

## Parameters

- **code** *(String, required)* — BDFD code to run later (never run now)
- **time** *(String, optional)* — Delay: 10s, 5m, 1h or milliseconds
- **name** *(String, optional)* — Name, to cancel it with $clearTimeout / $clearInterval

## Return Value

- String.

## Usage

```
$setTimeout[code;time;name] → result
```

## Example

```bdfd
$sendMessage[$setTimeout[code;time;name]]
```
