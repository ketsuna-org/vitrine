---
layout: doc
title: $date[]
translation_key: docs
category: "Date & Time"
function_name: date
syntax: $date
description: Returns the date currentle. Cette function est resolvede au runtime.
---

# $date[]

The `$date[]` function retourne the date currentle.

> **Important:** Cette function utilise l'identifier special `((date))` qui est resolved au **runtime**, i.e. à each execution of the command. The value peut varier d'une execution à l'autre.

## Syntax

```
$date
```

> **Note :** Cette function ne prend auca parameter.

## Return value

The date currentle, resolvede à each execution.

## Difference from les functions spécifiques

`$date[]` retourne the date complete. Pour obtenir of components spécifiques de the date, use :

| Function | Returns |
|----------|----------|
| `$day` | Le day du months (1-31) |
| `$month` | Le months (1-12) |
| `$year` | L'year (ex: 2026) |

## Examples

### Date simple

```bdfd
Nous sommes le $date
```

### Date in an embed

```bdfd
$title[📅 Informations]
$description[Date currentle : $date]
$footer[Time of the server]
```

## Notes

- La date est basée on the horloge système of the server exécutant the bot.
