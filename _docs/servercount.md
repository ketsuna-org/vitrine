---
layout: doc
title: $serverCount[]
translation_key: docs
category: "Entity Info"
function_name: serverCount
syntax: $serverCount
description: Returns the total number of servers the bot is present in.
---

# $serverCount[] — Bot Server Count

`$serverCount[]` returns the total number of Discord servers the bot is installed on.

## Syntax

```
$serverCount
```

## Parameters

No parameters.

## Return Value

- **Type**: `integer`
- The number of servers the bot belongs to.

## Examples

### Simple display

```bdfd
$sendMessage[🤖 I am currently on **$serverCount** servers!]
```

### Bot statistics

```bdfd
$title[📊 Bot Statistics]
$addField[🌐 Servers;$serverCount;yes]
$addField[🔢 Shard;$shardID;yes]
$color[#5865F2]
```

### Custom status message

```bdfd
$title[🤖 My Bot]
$description[Thank you for using me!]
$addField[Servers;$serverCount;yes]
$addField[Latency;$ping ms;yes]
$footer[Developed with BDFD]
$color[#2ECC71]
```

### Popularity message

```bdfd
$if[$serverCount>=100]
  $sendMessage[🎉 Thank you to the $serverCount servers that trust me!]
$else
  $sendMessage[I am on $serverCount servers. Help me grow!]
$endif
```

## Notes

- `$serverCount` counts the servers returned by Discord for the bot account at the time of the call (the list is read page by page).
- `$guildCount` gives the same number, but it is a separate function: when no guild query service is available it falls back to the `bot.guildCount` context variable (or `1`), whereas `$serverCount` has no fallback.
