---
layout: doc
title: $allMembersCount
translation_key: docs
category: "Entity Info"
function_name: allMembersCount
syntax: $allMembersCount
description: Returns the namebre total de members on the server (incluant les bots). Contrairement à $membersCount, cette function compte also les bots.
---

# $allMembersCount

The `$allMembersCount` function **récupérer the namebre total de members** on the server, en incluant les bots.

## Syntax

```
$allMembersCount
```

## Parameters

No parameters.

## Return value

- **Type** : String (number)
- The namebre total de members (users + bots) présents on the server.

## Behavior

- Counts all members of the server, y compris les bots.
- Diffère de `$membersCount` qui ne compte que users humains.
- La value est mise à day en temps réel.

## Examples

### Simple display

```bdfd
$title[📊 Statistiques of the server]
$description[
**Members totaux :** $allMembersCount
**Humains :** $membersCount
**Bots :** $botCount
]
$color[#5865F2]
$sendMessage[]
```

### Compareason humains vs bots

```bdfd
$let[humans;$membersCount]
$let[bots;$botCount]
$let[total;$allMembersCount]

$title[👥 Composition of the server]
$description[
**Total :** $total members
**👤 Humains :** $humans ($math[$humans*100/$total]%)
**🤖 Bots :** $bots ($math[$bots*100/$total]%)
]
$color[#57F287]
$sendMessage[]
```

### Compteur de bienvenue

```bdfd
$title[🎉 Bienvenue sur $serverName !]
$description[
Tu es le **$allMembersCountᵉ** member of the server !
]
$thumbnail[$userAvatar[$authorID]]
$sendMessage[$channelID[bienvenue]]
```

## Notes

- N'inclut que les members encore présents on the server.
- Pour avoir only les humains, use `$membersCount`.
- Pour avoir only les bots, use `$botCount`.
