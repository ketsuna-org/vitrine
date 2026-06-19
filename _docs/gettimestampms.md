---
layout: doc
title: $getTimestampMs
translation_key: docs
category: "Math & Text"
function_name: getTimestampMs
syntax: $getTimestampMs
description: Returns the timestamp Unix current en milliseconds. Resolved au runtime.
---

# $getTimestampMs

The function `$getTimestampMs` retourne le timestamp Unix current en **milliseconds**. The timestamp Unix represents the namebre de milliseconds écoulées dethen le 1er janvier 1970 à 00:00:00 UTC (epoch).

> **Important:** This function utilise l'identifier special `((getTimestampMs))` qui est resolved au **runtime**.

## Différence avec $getTimestamp

| Function | Unité | Exemple de value |
|----------|-------|-------------------|
| `$getTimestampMs` | **Milliseconds** (ms) | `1718697600123` |
| `$getTimestamp` | **Secondes** (s) | `1718697600` |

- `$getTimestampMs` = `$getTimestamp` × 1000 + milliseconds supplémentaires.
- Utilisez `$getTimestampMs` pour des mesures de **haute précision** (benchmarks, cooldowns fins, timeouts).
- Utilisez `$getTimestamp` pour des usages courants où la précision à la second suffit (dates, durées longues, stockage).

## Syntax

```
$getTimestampMs
```

> **Note :** This function ne prend no parameter.

## Parameters

Aucun parameter.

## Return Value

- **Type** : String (integer)
- Le timestamp Unix current en milliseconds (13 chiffres).

## Examples

### Timestamp simple

```bdfd
Timestamp ms : $getTimestampMs
```

### Mesure de performance

```bdfd
$let[start;$getTimestampMs]

$title[🔍 Test de performance]
$description[
Calcul in progress...
]
$sendMessage[]

$let[end;$getTimestampMs]
$let[duration;$sub[$get[end];$get[start]]]

$title[📊 Result]
$description[
Opération terminée en **$get[duration] ms**.
]
$color[#5865F2]
$sendMessage[]
```

### Cooldown précis (anti-spam)

```bdfd
$let[now;$getTimestampMs]
$let[last;$getUserVar[lastCmd]]
$let[diff;$sub[$get[now];$get[last]]]

$if[$get[diff]<2000]
  $title[⏳ Trop fast !]
  $description[
  Attends encore **$math[(2000 - $get[diff]) / 1000]** seconds.
  ]
  $color[#ED4245]
  $sendMessage[]
  $stop[]
$endif

$setUserVar[lastCmd;$get[now]]
Ta command s'est executed avec success !
```

### Conversion en seconds

```bdfd
$let[ms;$getTimestampMs]
$let[seconds;$math[$get[ms] / 1000]]

Timestamp ms : $get[ms]
Timestamp seconds : $get[seconds]
```

## Notes

- La précision est à la millisecond près (1 ms = 0,001 second).
- Pour comparer with a timestamp en seconds, n'oubliez pas de convertedr : multipliez les seconds par 1000 or divisez les milliseconds par 1000.
- Les values retournées sont des integers, mais les calculs avec `$math[]` peuvent produire des numbers décimaux during la conversion.
