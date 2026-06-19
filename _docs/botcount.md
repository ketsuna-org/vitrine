---
layout: doc
title: $botCount[]
translation_key: docs
category: "Entity Info"
function_name: botCount
syntax: $botCount
description: Returns the number of bots present on the Discord server.
---

# $botCount[] — Number of Bots

`$botCount[]` returns the number of bot accounts present on the Discord server.

## Syntax

```
$botCount
```

## Parameters

No parameters.

## Return value

- **Type**: `integer`
- The number of bots on the server.

## Usage

### Simple display

```bdfd
$sendMessage[🤖 **$botCount** bots on this server.]
```

### Human/Bot Ratio

```bdfd
$var[humans;$sub[$membersCount;$botCount]]
$title[📊 Composition of $serverName]
$addField[👤 Humans;$var[humans];yes]
$addField[🤖 Bots;$botCount;yes]
$addField[👥 Total;$membersCount;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Alert if too many bots

```bdfd
$if[$botCount>$var[humans]]
$sendMessage[⚠️ There are more bots ($botCount) than humans ($var[humans])!]
$endif
```

### Complete Statistics

```bdfd
$title[📊 Statistics for $serverName]
$addField[👥 Total;$membersCount;yes]
$addField[👤 Humans;$sub[$membersCount;$botCount];yes]
$addField[🤖 Bots;$botCount;yes]
$addField[🟢 Online;$onlineMembers;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

## Notes

- A "bot" is determined by the `bot` flag set on the Discord user account.
- To get the number of humans, subtract `$botCount` from the total: `$sub[$membersCount;$botCount]`.
- The bot running the command is included in this total.
