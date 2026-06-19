---
layout: doc
title: $year[]
translation_key: docs
category: "Date & Time"
function_name: year
syntax: $year
description: "Returns the year currentle (ex: 2026). Resolved to the runtime."
---

# $year[]

The function `$year[]` retourne l'year currentle.

> **Important:** This function utilise l'identifier special `((year))` qui est resolved to the **runtime**.

## Syntax

```
$year
```

> **Note :** This function ne prend no parameter.

## Return Value

The year currentle (for example `2026`), sous forme of string of becauseactères.

## Examples

### Année simple

```bdfd
Nous sommes en $year.
```

### Calcul of âge

```bdfd
Vous êtes né en 2000 ? Vous avez $sub[$year;2000] ans !
```

### Copyright dynamic

```bdfd
$footer[© $year - MonBot]
```

## Notes

- L'year est basée on the horloge système of the server exécutant the bot.
- Utile for the footers of copyright dynamics.
