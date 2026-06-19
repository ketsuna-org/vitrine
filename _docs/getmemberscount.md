---
layout: doc
title: $getMembersCount
translation_key: docs
category: "Server & Channels"
function_name: getMembersCount
syntax: $getMembersCount
description: Returns the number total de members on the server (incluant les bots). Alias possible de $membersCount.
---
# $getMembersCount

The function `$getMembersCount` retourne le **number total de members** of the server Discord.

## Syntax

```
$getMembersCount
```

## Parameters

Aucun.

## Return Value

- **Type** : Number (string)
- The namebre total de members (humains + bots).

## Examples

### Affichage simple

```bdfd
$sendMessage[👥 Ce server compte $getMembersCount members !]
```

### Message de bienvenue

```bdfd
$title[👋 Bienvenue $username !]
$description[
Bienvenue sur **$serverName** !
Tu es le member **#$getMembersCount** !
]
$thumbnail[$authorAvatar]
$color[#57F287]
$sendMessage[]
```

### Condition de taille

```bdfd
$if[$getMembersCount<100]
  $sendMessage[Nous sommes encore une petite communauté de $getMembersCount members 💚]
$elseIf[$getMembersCount<1000]
  $sendMessage[Déjà $getMembersCount members, merci à all ! 🎉]
$else
  $sendMessage[Plus de 1000 members, incroyable ! 🚀]
$endif
```

### Stats of the server

```bdfd
$title[📊 Statistiques de $serverName]
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
- Équivaslow functionnel à `$membersCount`.
- Se met à day automatically when des members rejoignent/quittent.
