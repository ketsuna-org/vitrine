---
layout: doc
title: $botCount[]
translation_key: docs
category: "Entity Info"
function_name: botCount
syntax: $botCount[(ignored)]
description: Returns the number of bot accounts among the members of the current Discord server.
---

# $botCount[] — Number of Bots

`$botCount[]` returns the number of bot accounts among the members of the server where the command runs (the bot itself included).

## Syntax

```
$botCount[(ignored)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:--------:|
| `ignored` | The engine accepts one optional argument but ignores it: the count is always for the current server. | No |

## Return value

- **Type**: `integer`
- The number of members of the current server whose account is a bot. The engine lists all members of the server to compute it.

## Examples

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
$thumbnail[$serverIcon]
$color[#5865F2]
```

## Notes

- A "bot" is determined by the `bot` flag set on the Discord user account.
- To get the number of humans, subtract `$botCount` from the total: `$sub[$membersCount;$botCount]`.
- The bot running the command is included in this total.
