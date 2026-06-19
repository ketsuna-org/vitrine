---
layout: doc
title: $getTimestamp[]
translation_key: docs
category: "Date & Time"
function_name: getTimestamp
syntax: $getTimestamp
description: Retourne le timestamp Unix actuel en secondes. Résolu au runtime.
---

# $getTimestamp[]

La fonction `$getTimestamp[]` retourne le timestamp Unix actuel en secondes. Le timestamp Unix représente le nombre de secondes écoulées depuis le 1er janvier 1970 à 00:00:00 UTC (epoch).

> **Important :** Cette fonction utilise l'identifiant spécial `((getTimestamp))` qui est résolu au **runtime**.

## Syntaxe

```
$getTimestamp
```

> **Note :** Cette fonction ne prend aucun paramètre.

## Valeur de retour

Un nombre entier représentant le timestamp Unix actuel en secondes.

## Exemples

### Timestamp simple

```bdfd
Timestamp actuel : $getTimestamp
```

### Calcul de durée

```bdfd
$let[now;$getTimestamp]
$let[event;1718697600]
Temps restant : $sub[$get[event];$get[now]] secondes
```

### Stocker un horodatage

```bdfd
$setUserVar[lastCommand;$getTimestamp]
```

## Notes

- Le timestamp est en **secondes** (pas en millisecondes).
- Utile pour les calculs de durée, les cooldowns, ou le stockage d'horodatages.
