---
layout: doc
title: $memberCount[]
translation_key: docs
category: "Entity Info"
function_name: memberCount
syntax: $memberCount
description: Returns the number total de members (users + bots) on the server Discord.
---

# $memberCount[] — Number de Members

`$memberCount[]` retourne the namebre total de members présents on the server Discord, incluant à la fois les users humains and les bots.

## Syntax

```
$memberCount
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `integer`
- The namebre total de members (users + bots).

## Utilisation

### Affichage simple

```bdfd
$sendMessage[👥 **$memberCount** members sur ce server !]
```

### Embed statistiques

```bdfd
$title[📊 Statistiques de $serverName]
$addField[👥 Total members;$memberCount;yes]
$addField[🟢 Online;$onlineMembers;yes]
$addField[🤖 Bots;$botCount;yes]
$addField[👤 Humains;$sub[$memberCount;$botCount];yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Message de bienvenue custom

```bdfd
$sendMessage[Bienvenue $username ! Tu es le **$memberCount**ème member ! 🎉]
```

### Condition de taille

```bdfd
$if[$memberCount>=1000]
$sendMessage[🌟 Ce server a plus de 1000 members !]
$elseIf[$memberCount>=100]
$sendMessage[👍 Ce server a plus de 100 members.]
$else
$sendMessage[🌱 Ce server est encore petit mais en croissance !]
$endif
```

### Jalon (milestone)

```bdfd
$if[$memberCount==100]
$sendMessage[🎉 **100 MEMBRES !** Félicitations à toute la communauté !]
$elseIf[$memberCount==500]
$sendMessage[🚀 **500 MEMBRES !** Merci à all pour votre soutien !]
$elseIf[$memberCount==1000]
$sendMessage[🌟 **1000 MEMBRES !** Quel cap incroyable !]
$endif
```

## Notes

- `$memberCount[]` and `$membersCount[]` sont identicals.
- Le compte inclut all members, y compris les bots.
- Pour obtenir only the namebre d'humains, faites `$sub[$memberCount;$botCount]`.
- Pour obtenir the namebre de members online, utilisez `$onlineMembers[]`.
