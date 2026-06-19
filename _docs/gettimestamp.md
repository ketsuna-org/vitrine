---
layout: doc
title: $getTimestamp[]
translation_key: docs
category: "Date & Time"
function_name: getTimestamp
syntax: $getTimestamp
description: Returns the timestamp Unix current en seconds. Resolved to the runtime.
---

# $getTimestamp[]

The function `$getTimestamp[]` retourne le timestamp Unix current en seconds. The timestamp Unix represents the namebre of seconds écoulées dethen le 1er janvier 1970 to 00:00:00 UTC (epoch).

> **Important:** This function utilise l'identifier special `((getTimestamp))` qui est resolved to the **runtime**.

## Syntax

```
$getTimestamp
```

> **Note :** This function ne prend no parameter.

## Return Value

A integer représentant le timestamp Unix current en seconds.

## Examples

### Timestamp simple

```bdfd
Timestamp current : $getTimestamp
```

### Calcul of durée

```bdfd
$let[now;$getTimestamp]
$let[event;1718697600]
Temps restant : $sub[$get[event];$get[now]] seconds
```

### Stocker un timestamp

```bdfd
$setUserVar[lastCommand;$getTimestamp]
```

## Notes

- Le timestamp est en **seconds** (pas en milliseconds).
- Utile for the calculs of durée, les cooldowns, or le stockage of timestamps.
