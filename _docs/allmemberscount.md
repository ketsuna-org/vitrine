---
layout: doc
title: $allMembersCount
translation_key: docs
category: "Entity Info"
function_name: allMembersCount
syntax: $allMembersCount
description: Returns the total number of members summed over all the servers the bot is in (bots included). For the current server only, use $membersCount.
---

# $allMembersCount

The `$allMembersCount` function returns the **sum of the member counts of every server the bot is in**, bots included.

## Syntax

```
$allMembersCount
```

## Parameters

No parameters (passing one is an error).

## Return value

- **Type**: String (number)
- The sum, over all the servers the bot belongs to, of the number of members of each server (humans and bots). A person who is in several of these servers is counted once per server.

## Behavior

- The engine lists the servers of the bot, then lists the members of each one and adds up the numbers. This makes several requests to Discord and can be slow on a bot in many large servers.
- It is **not** the member count of the current server: for that, use `$membersCount` (or `$getMembersCount`), which also includes bots.
- For the bots of the current server only, use `$botCount`.

## Examples

### Simple display

```bdfd
$title[📊 Statistics]
$description[
**Members over all servers:** $allMembersCount
**Members of this server:** $membersCount
**Bots of this server:** $botCount
]
$color[#5865F2]
```

### Humans of the current server

```bdfd
$var[total;$membersCount]
$var[bots;$botCount]
$title[👥 Server Composition]
$description[
**Total:** $var[total] members
**👤 Humans:** $sub[$var[total];$var[bots]]
**🤖 Bots:** $var[bots]
]
$color[#57F287]
```

## Notes

- To get the number of servers, use `$serverCount`.
