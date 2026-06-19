---
layout: doc
title: $logQuota
translation_key: docs
category: "Flags & Debug"
function_name: logQuota
syntax: $logQuota
description: Displays thes informations sur le quota de logs restant for the application BDFD. Utile pour surveiller la consommation.
---
# $logQuota

The function `$logQuota` retourne les **informations sur le quota de logs** de votre application BDFD.

## Syntax

```
$logQuota
```

## Parameters

Aucun.

## Return Value

- **Type** : String / Number
- The namebre de logs restants or le pourcentage de quota utilisé.

## Behavior

- Returns thes statistiques de consommation de logs.
- Utile pour surveiller si vous approchez de la limit de votre plan.
- The value exact dépend du plan BDFD (gratuit, premium, etc.).

## Examples

### Afficher le quota

```bdfd
$sendMessage[Logs restants : $logQuota]
```

### Alerte quota bas

```bdfd
$if[$logQuota<100]
  $sendMessage[⚠️ Warning: quota de logs bas ($logQuota restants).]
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

- Le quota de logs varie selon votre abonnement BDFD.
- Chaque `$log[]` consomme un log.
- Surveillez votre quota pour éviter les pertes de logs en production.
