---
layout: doc
title: $getTimestampMs
translation_key: docs
category: "Math & Text"
function_name: getTimestampMs
syntax: $getTimestampMs
description: Retourne le timestamp Unix actuel en millisecondes. Résolu au runtime.
---

# $getTimestampMs

La fonction `$getTimestampMs` retourne le timestamp Unix actuel en **millisecondes**. Le timestamp Unix représente le nombre de millisecondes écoulées depuis le 1er janvier 1970 à 00:00:00 UTC (epoch).

> **Important :** Cette fonction utilise l'identifiant spécial `((getTimestampMs))` qui est résolu au **runtime**.

## Différence avec $getTimestamp

| Fonction | Unité | Exemple de valeur |
|----------|-------|-------------------|
| `$getTimestampMs` | **Millisecondes** (ms) | `1718697600123` |
| `$getTimestamp` | **Secondes** (s) | `1718697600` |

- `$getTimestampMs` = `$getTimestamp` × 1000 + millisecondes supplémentaires.
- Utilisez `$getTimestampMs` pour des mesures de **haute précision** (benchmarks, cooldowns fins, timeouts).
- Utilisez `$getTimestamp` pour des usages courants où la précision à la seconde suffit (dates, durées longues, stockage).

## Syntaxe

```
$getTimestampMs
```

> **Note :** Cette fonction ne prend aucun paramètre.

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : String (nombre entier)
- Le timestamp Unix actuel en millisecondes (13 chiffres).

## Exemples

### Timestamp simple

```bdfd
Timestamp ms : $getTimestampMs
```

### Mesure de performance

```bdfd
$let[start;$getTimestampMs]

$title[🔍 Test de performance]
$description[
Calcul en cours...
]
$sendMessage[]

$let[end;$getTimestampMs]
$let[duration;$sub[$get[end];$get[start]]]

$title[📊 Résultat]
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
  $title[⏳ Trop rapide !]
  $description[
  Attends encore **$math[(2000 - $get[diff]) / 1000]** secondes.
  ]
  $color[#ED4245]
  $sendMessage[]
  $stop[]
$endif

$setUserVar[lastCmd;$get[now]]
Ta commande s'est exécutée avec succès !
```

### Conversion en secondes

```bdfd
$let[ms;$getTimestampMs]
$let[seconds;$math[$get[ms] / 1000]]

Timestamp ms : $get[ms]
Timestamp secondes : $get[seconds]
```

## Notes

- La précision est à la milliseconde près (1 ms = 0,001 seconde).
- Pour comparer avec un timestamp en secondes, n'oubliez pas de convertir : multipliez les secondes par 1000 ou divisez les millisecondes par 1000.
- Les valeurs retournées sont des entiers, mais les calculs avec `$math[]` peuvent produire des nombres décimaux lors de la conversion.
