---
layout: doc
title: $getMembersCount
translation_key: docs
category: "Server & Channels"
function_name: getMembersCount
syntax: $getMembersCount
description: Returns the number total of members on the server (incluant les bots). Alias possible of $membersCount.
---
# $getMembersCount

The function `$getMembersCount` retourne le **number total of members** of the server Discord.

## Syntax

```
$getMembersCount
```

## Parameters

Aucun.

## Return Value

- **Type** : Number (string)
- The namebre total of members (humains + bots).

## Examples

### Affichage simple

```bdfd
$sendMessage[👥 Ce server compte $getMembersCount members !]
```

### Message of bienvenue

```bdfd
$title[👋 Bienvenue $username !]
$description[
Bienvenue on **$serverName** !
Tu es le member **#$getMembersCount** !
]
$thumbnail[$authorAvatar]
$color[#57F287]
$sendMessage[]
```

### Condition of taille

```bdfd
$if[$getMembersCount<100]
  $sendMessage[Nous sommes encore une petite communauté of $getMembersCount members 💚]
$elseIf[$getMembersCount<1000]
  $sendMessage[Déjà $getMembersCount members, merci to all ! 🎉]
$else
  $sendMessage[Plus of 1000 members, incroyable ! 🚀]
$endif
```

### Stats of the server

```bdfd
$title[📊 Statistiques of $serverName]
$description[
**Members** : $getMembersCount
**Bots** : $botCount
**Channels** : $channelCount
**Roles** : $roleCount
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Inclut les bots in the compte. Pour les humains only, faites `$c[$getMembersCount-$botCount]`.
- Équivaslow functionnel to `$membersCount`.
- Se met to day automatically when members rejoignent/quittent.
