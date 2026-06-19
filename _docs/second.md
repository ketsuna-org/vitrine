---
layout: doc
title: $second[]
translation_key: docs
category: "Date & Time"
function_name: second
syntax: $second
description: Returns the second currentle (0 to 59). Resolved to the runtime.
---

# $second[]

The function `$second[]` retourne la second currentle (de 0 to 59).

> **Important:** This function utilise l'identifier special `((second))` qui est resolved to the **runtime**.

## Syntax

```
$second
```

> **Note :** This function ne prend no parameter.

## Return Value

A number between 0 and 59 représentant la second currentle.

## Examples

### Seconde simple

```bdfd
Seconde currentle : $second
```

### Time complete custome

```bdfd
Il est précisément $hour:$minute and $second seconds.
```

### Horloge in a embed

```bdfd
$title[🕐 Horloge]
$description[$hour:$minute:$second]
$footer[Mis to day to each exécution]
```

## Notes

- Utilisez `$time[]` pour obtenir l'hour formattede `HH:MM:SS` directly.
