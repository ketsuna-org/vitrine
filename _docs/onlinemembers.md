---
layout: doc
title: $onlineMembers
translation_key: docs
category: "Entity Info"
function_name: onlineMembers
syntax: $onlineMembers
description: Returns the number of members currently online on the Discord server (status "online", "idle", or "do not disturb").
---

# $onlineMembers — Online Members

`$onlineMembers` returns the number of members currently online on the server. Members with the statuses Online, Idle, and Do Not Disturb (dnd) are considered "online".

## Syntax

```
$onlineMembers
```

## Parameters

No parameters.

## Return Value

- **Type** : `integer`
- The number of online members.

## Usage

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
$sendEmbedMessage
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
$sendEmbedMessage
```

## Notes

- Includes the statuses "online", "idle", and "do not disturb" (dnd).
- Does not include invisible members (offline or invisible status), as Discord does not expose this information.
- Useful for evaluating server activity in real-time.
- To calculate the ratio, use `$onlineMembers / $membersCount * 100`.
