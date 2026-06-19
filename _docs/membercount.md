---
layout: doc
title: $memberCount[]
translation_key: docs
category: "Entity Info"
function_name: memberCount
syntax: $memberCount
description: Returns the total number of members (users + bots) on the Discord server.
---

# $memberCount[] — Number of Members

`$memberCount` returns the total number of members present on the Discord server, including both human users and bots.

## Syntax

```
$memberCount
```

## Parameters

None.

## Return Value

- **Type** : `integer`
- The total number of members (users + bots).

## Usage

### Simple display

```bdfd
$sendMessage[👥 **$memberCount** members on this server!]
```

### Statistics embed

```bdfd
$title[📊 $serverName Statistics]
$addField[👥 Total Members;$memberCount;yes]
$addField[🟢 Online;$onlineMembers;yes]
$addField[🤖 Bots;$botCount;yes]
$addField[👤 Humans;$sub[$memberCount;$botCount];yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Custom welcome message

```bdfd
$sendMessage[Welcome $username! You are member #$memberCount! 🎉]
```

### Server size check

```bdfd
$if[$memberCount>=1000]
$sendMessage[🌟 This server has more than 1000 members!]
$elseIf[$memberCount>=100]
$sendMessage[👍 This server has more than 100 members.]
$else
$sendMessage[🌱 This server is still growing!]
$endif
```

### Milestone checks

```bdfd
$if[$memberCount==100]
$sendMessage[🎉 **100 MEMBERS!** Congratulations to the entire community!]
$elseIf[$memberCount==500]
$sendMessage[🚀 **500 MEMBERS!** Thank you all for your support!]
$elseIf[$memberCount==1000]
$sendMessage[🌟 **1000 MEMBERS!** What an incredible milestone!]
$endif
```

## Notes

- `$memberCount` and `$membersCount` are identical.
- The count includes all members, including bots.
- To get only the number of human users, use `$sub[$memberCount;$botCount]`.
- To get the number of online members, use `$onlineMembers`.

