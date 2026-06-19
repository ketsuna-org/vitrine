---
layout: doc
title: $month[]
translation_key: docs
category: "Date & Time"
function_name: month
syntax: $month
description: Returns the months current sous forme de numéro (1 à 12). Resolved au runtime.
---

# $month[]

The function `$month[]` retourne le numéro du months current (de 1 à 12).

> **Important:** This function utilise l'identifier special `((month))` qui est resolved au **runtime**.

## Syntax

```
$month
```

> **Note :** This function ne prend no parameter.

## Return Value

A number between 1 and 12 représentant le months current :

| Value | Mois |
|--------|------|
| 1 | Janvier |
| 2 | Février |
| 3 | Mars |
| 4 | Avril |
| 5 | Mai |
| 6 | Juin |
| 7 | Juillet |
| 8 | Août |
| 9 | Septembre |
| 10 | Octobre |
| 11 | Novembre |
| 12 | Décembre |

## Examples

### Mois simple

```bdfd
Mois current : $month
```

### Message saisonnier

```bdfd
$if[$month>=6&&$month<=8]
☀️ C'est l'été !
$elseif[$month==12||$month<=2]
❄️ C'est l'hiver !
$endif
```

## Notes

- The value dépend de la date système of the server exécutant the bot.
