---
layout: doc
title: $onlineMembers
translation_key: docs
category: "Entity Info"
function_name: onlineMembers
syntax: $onlineMembers[(unused)]
description: Returns the online member count supplied by the host in guild.onlineMembers or, when there is none, the total number of members of the server.
---

# $onlineMembers — Online Members

`$onlineMembers` returns the `guild.onlineMembers` context variable supplied by the host. The engine does not read member presences itself.

## Syntax

```
$onlineMembers[(unused)]
```

## Parameters

One optional argument is accepted but ignored.

## Return Value

- **Type** : `integer` (as text)
- The text of the `guild.onlineMembers` context variable if the host supplied one.
- Otherwise the **total** number of members of the server (the same value as `$memberCount`, bots included), obtained by listing the members from Discord. In that case the result is not a count of online members.

## Examples

### Simple display

```bdfd
$sendMessage[🟢 **$onlineMembers** members online ($onlineMembers/$membersCount)]
```

### Stats Embed

```bdfd
$title[📊 Activity on $serverName]
$addField[🟢 Online;$onlineMembers;yes]
$addField[👥 Total;$membersCount;yes]
$addField[📊 Ratio;$round[$multi[$divide[$onlineMembers;$membersCount];100]]%;yes]
$thumbnail[$serverIcon]
$color[#2ECC71]
```

### Calculating activity rate

```bdfd
$var[activityRate;$round[$multi[$divide[$onlineMembers;$membersCount];100]]]
$if[$var[activityRate]>=50]
$sendMessage[🔥 $var[activityRate]% of members are online!]
$else
$sendMessage[💤 Only $var[activityRate]% of members are online.]
$endif
```

### Minimal Dashboard

```bdfd
$title[📋 Dashboard — $serverName]
$addField[🟢 Online;$onlineMembers;yes]
$addField[👥 Total;$membersCount;yes]
$addField[🤖 Bots;$botCount;yes]
$addField[🚀 Boosts;$serverBoostCount;yes]
$color[#5865F2]
```

## Notes

- Without a host-supplied value, `$onlineMembers` equals `$membersCount`, so the ratio examples above give 100%.
- To calculate a ratio, use `$divide` and `$multi` as in the examples.
