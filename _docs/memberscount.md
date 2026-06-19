---
layout: doc
title: $membersCount[]
translation_key: docs
category: "Entity Info"
function_name: membersCount
syntax: $membersCount
description: Returns the number total de members on the server Discord. Identical à $memberCount.
---

# $membersCount[] — Number de Members

`$membersCount[]` retourne the namebre total de members on the server Discord. This function est strictement identical à `$memberCount[]`.

## Syntax

```
$membersCount
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `integer`
- The namebre total de members.

## Utilisation

### Affichage simple

```bdfd
$sendMessage[👥 **$membersCount** members !]
```

### Embed statistiques

```bdfd
$title[📊 $serverName]
$addField[👥 Members;$membersCount;yes]
$addField[🟢 Online;$onlineMembers;yes]
$addField[🤖 Bots;$botCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Compareason

```bdfd
$if[$membersCount>$var[previousCount]]
$sendMessage[📈 The server a gagné des members !]
$endif
```

## Notes

- `$membersCount[]` and `$memberCount[]` sont interchangeables.
- Inclut à la fois les humains and les bots.
- Pour le décompte humains seuls, utilisez `$sub[$membersCount;$botCount]`.
