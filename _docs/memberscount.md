---
layout: doc
title: $membersCount[]
translation_key: docs
category: "Entity Info"
function_name: membersCount
syntax: $membersCount
description: Returns the total number of members on the Discord server. Identical to $memberCount.
---

# $membersCount[] — Number of Members

`$membersCount` returns the total number of members on the Discord server. This function is strictly identical to `$memberCount`.

## Syntax

```
$membersCount
```

## Parameters

None.

## Return Value

- **Type** : `integer`
- The total number of members.

## Examples

### Simple display

```bdfd
$sendMessage[👥 **$membersCount** members!]
```

### Statistics embed

```bdfd
$title[📊 $serverName]
$addField[👥 Members;$membersCount;yes]
$addField[🟢 Online;$onlineMembers;yes]
$addField[🤖 Bots;$botCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
```

### Comparison

```bdfd
$if[$membersCount>$var[previousCount]]
$sendMessage[📈 The server has gained members!]
$endif
```

## Notes

- `$membersCount` and `$memberCount` use the same implementation: the number of members obtained by listing the server's members from Discord (1000 per request), bots included.
- To get the count of human users only, use `$sub[$membersCount;$botCount]`.

