---
layout: doc
title: $memberCount[]
translation_key: docs
category: "Entity Info"
function_name: memberCount
syntax: $memberCount
description: Returns the number total of members (users + bots) on the server Discord.
---

# $memberCount[] — Number of Members

`$memberCount[]` retourne the namebre total of members présents on the server Discord, incluant to la fois les users humains and les bots.

## Syntax

```
$memberCount
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `integer`
- The namebre total of members (users + bots).

## Utilisation

### Affichage simple

```bdfd
$sendMessage[👥 **$memberCount** members on ce server !]
```

### Embed statistiques

```bdfd
$title[📊 Statistiques of $serverName]
$addField[👥 Total members;$memberCount;yes]
$addField[🟢 Online;$onlineMembers;yes]
$addField[🤖 Bots;$botCount;yes]
$addField[👤 Humains;$sub[$memberCount;$botCount];yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Message of bienvenue custom

```bdfd
$sendMessage[Bienvenue $username ! Tu es le **$memberCount**ème member ! 🎉]
```

### Condition of taille

```bdfd
$if[$memberCount>=1000]
$sendMessage[🌟 Ce server a plus of 1000 members !]
$elseIf[$memberCount>=100]
$sendMessage[👍 Ce server a plus of 100 members.]
$else
$sendMessage[🌱 Ce server est encore petit mais en croissance !]
$endif
```

### Jalon (milestone)

```bdfd
$if[$memberCount==100]
$sendMessage[🎉 **100 MEMBRES !** Félicitations to toute la communauté !]
$elseIf[$memberCount==500]
$sendMessage[🚀 **500 MEMBRES !** Merci to all pour votre soutien !]
$elseIf[$memberCount==1000]
$sendMessage[🌟 **1000 MEMBRES !** Quel cap incroyable !]
$endif
```

## Notes

- `$memberCount[]` and `$membersCount[]` sont identicals.
- Le compte inclut all members, y compris les bots.
- Pour obtenir only the namebre of humains, faites `$sub[$memberCount;$botCount]`.
- Pour obtenir the namebre of members online, utilisez `$onlineMembers[]`.
