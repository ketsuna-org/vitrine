---
layout: doc
title: $logQuota
translation_key: docs
category: "Flags & Debug"
function_name: logQuota
syntax: $logQuota
description: Affiche les informations sur le quota de logs restant pour l'application BDFD. Utile pour surveiller la consommation.
parameters: []
returns:
  - type: string
    description: Informations sur le quota de logs (nombre restant, total, etc.).
related:
  - $log
  - $debug
  - $optOff
examples:
  - description: Vérifier le quota de logs
    code: $sendMessage[Quota logs : $logQuota]
---
# $logQuota

La fonction `$logQuota` retourne les **informations sur le quota de logs** de votre application BDFD.

## Syntaxe

```
$logQuota
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : Chaîne / Nombre
- Le nombre de logs restants ou le pourcentage de quota utilisé.

## Comportement

- Retourne les statistiques de consommation de logs.
- Utile pour surveiller si vous approchez de la limite de votre plan.
- La valeur exacte dépend du plan BDFD (gratuit, premium, etc.).

## Exemples

### Afficher le quota

```bdfd
$sendMessage[Logs restants : $logQuota]
```

### Alerte quota bas

```bdfd
$if[$logQuota<100]
  $sendMessage[⚠️ Attention : quota de logs bas ($logQuota restants).]
$else
  $sendMessage[Logs restants : $logQuota]
$endif
```

### Dashboard admin

```bdfd
$title[📊 Statut du bot]
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
