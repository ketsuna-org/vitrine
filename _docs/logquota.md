---
layout: doc
title: $logQuota
translation_key: docs
category: "Flags & Debug"
function_name: logQuota
syntax: $logQuota
description: Displays thes information on the quota of logs restant for the application BDFD. Utile pour surveiller la consommation.
---
# $logQuota

The function `$logQuota` retourne les **information on the quota of logs** of votre application BDFD.

## Syntax

```
$logQuota
```

## Parameters

Aucun.

## Return Value

- **Type** : String / Number
- The namebre of logs restants or le pourcentage of quota utilisé.

## Behavior

- Returns thes statistiques of consommation of logs.
- Utile pour surveiller si vous approchez of la limit of votre plan.
- The value exact dépend of the plan BDFD (gratuit, premium, etc.).

## Examples

### Display le quota

```bdfd
$sendMessage[Logs restants : $logQuota]
```

### Alerte quota bas

```bdfd
$if[$logQuota<100]
  $sendMessage[⚠️ Warning: quota of logs bas ($logQuota restants).]
$else
  $sendMessage[Logs restants : $logQuota]
$endif
```

### Dashboard admin

```bdfd
$title[📊 Status of the bot]
$description[
**Logs restants** : $logQuota
**RAM utilisée** : $ram
**Uptime** : $uptime
]
$color[#FEE75C]
$sendMessage[]
```

## Notes

- Le quota of logs varie according to votre abonnement BDFD.
- Chaque `$log[]` consomme un log.
- Surveillez votre quota pour éviter les pertes of logs en production.
