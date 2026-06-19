---
layout: doc
title: $onlineMembers[]
translation_key: docs
category: "Entity Info"
function_name: onlineMembers
syntax: $onlineMembers
description: Returns the number of members currentlement online on the server Discord (status "online", "inactif" or "ne pas déranger").
---

# $onlineMembers[] — Members en Ligne

`$onlineMembers[]` retourne the namebre of members currentlement online on the server. Sont considérés like "online" les members with thes statuss Online, Inactif (idle) and Ne pas déranger (dnd).

## Syntax

```
$onlineMembers
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `integer`
- The namebre of members online.

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🟢 **$onlineMembers** members online on $onlineMembers/$membersCount]
```

### Embed statistiques

```bdfd
$title[📊 Activité on $serverName]
$addField[🟢 Online;$onlineMembers;yes]
$addField[👥 Total;$membersCount;yes]
$addField[📊 Ratio;$round[$multi[$divide[$onlineMembers;$membersCount];100]]%;yes]
$thumbnail[$serverIcon]
$color[#2ECC71]
$sendEmbedMessage
```

### Calcul of the taux of activité

```bdfd
$var[activityRate;$round[$multi[$divide[$onlineMembers;$membersCount];100]]]
$if[$var[activityRate]>=50]
$sendMessage[🔥 $var[activityRate]% members sont online !]
$else
$sendMessage[💤 Seulement $var[activityRate]% members sont online.]
$endif
```

### Dashboard minimal

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

- Inclut les statuss "online", "inactif" (idle) and "ne pas déranger" (dnd).
- N'inclut pas les members invisibles (offline/status invisible) — Discord ne les expose pas.
- Utile pour évaluer l'activité en temps réel of the server.
- Pour le ratio, faites `$onlineMembers / $membersCount * 100`.
