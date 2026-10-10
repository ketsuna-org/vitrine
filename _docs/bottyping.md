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

- Each call sends one typing trigger to the current channel immediately (an error `Channel is not a text channel` is raised if the channel is not a text channel).
- How long the indicator stays visible is decided by Discord.
- Useful to give visual feedback.

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
$var[result;$httpGet[https://api.example.com/data]]
$if[$var[result]!=]
  $sendMessage[Data retrieved successfully.]
$else
  $sendMessage[Error during retrieval.]
$endif
```

## Notes

- The indicator is purely cosmetic and has no effect on processing.
- Particularly useful for commands with `$wait[]` or API calls.
