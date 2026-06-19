---
layout: doc
title: $botTyping
translation_key: docs
category: "Moderation"
function_name: botTyping
syntax: $botTyping
description: Triggers the typing indicator in the current channel, showing users that the bot is typing.
---

# $botTyping

The `$botTyping[]` function **triggers the typing indicator** ("Bot is typing...") in the channel where the command is executed.

## Syntax

```
$botTyping
```

## Parameters

This function does not take any parameters.

## Return value

This function does not return a value.

## Behavior

- The typing indicator lasts about 10 seconds or until a message is sent.
- Useful to simulate a processing delay or to provide visual feedback.
- The indicator stops automatically if a message is sent.

## Examples

### Processing with feedback

```bdfd
$botTyping
$wait[3]
$sendMessage[Processing completed! Here are the results...]
```

### Search simulation

```bdfd
$botTyping
$wait[2]
$sendMessage[🔍 Searching the database...]
$botTyping
$wait[2]
$sendMessage[✅ Results found!]
```

### Long action execution

```bdfd
$botTyping
$let[result;$httpGet[https://api.example.com/data]]
$if[$result!=]
  $sendMessage[Data retrieved successfully.]
$else
  $sendMessage[Error during retrieval.]
$endif
```

## Notes

- The indicator is purely cosmetic and has no effect on actual processing.
- Particularly useful for commands with `$wait[]` or API calls.
- Only works in text channels.
