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

## Usage

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
$sendEmbedMessage
```

### Custom status message

```bdfd
$title[🤖 My Bot]
$description[Thank you for using me!]
$addField[Servers;$serverCount;yes]
$addField[Latency;$ping ms;yes]
$footer[Developed with BDFD]
$color[#2ECC71]
$sendEmbedMessage
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

- `$serverCount[]` is an alias of `$guildCount[]`.
- The count includes all servers the bot is present in, regardless of the shard.
- The number is updated automatically when the bot joins or leaves a server.
- Useful for statistics commands and "About" pages of the bot.
