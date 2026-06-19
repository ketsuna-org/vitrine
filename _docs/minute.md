---
layout: doc
title: $minute[]
translation_key: docs
category: "Date & Time"
function_name: minute
syntax: $minute
description: Returns the minute currentle (0 to 59). Resolved to the runtime.
---

# $minute[]

The function `$minute[]` retourne la minute currentle (de 0 to 59).

> **Important:** This function utilise l'identifier special `((minute))` qui est resolved to the **runtime**.

## Syntax

```
$minute
```

> **Note :** This function ne prend no parameter.

## Return Value

A number between 0 and 59 représentant la minute currentle.

## Examples

### Minute simple

```bdfd
Minute currentle : $minute
```

### Time and minutes combinées

```bdfd
Il est $hour h $minute
```

### Format with zéro devant

```bdfd
$if[$minute<10]
Il est $hour:0$minute
$else
Il est $hour:$minute
$endif
```

## Notes

- Utilisez `$time[]` pour obtenir l'hour complete to the format `HH:MM:SS`.
- Combinée with `$hour[]` and `$second[]`, this function allows create horloges customes.
