---
layout: doc
title: $date[]
translation_key: docs
category: "Date & Time"
function_name: date
syntax: $date
description: Returns the date currentle. Cette function est resolvede to the runtime.
---

# $date[]

The `$date[]` function retourne the date currentle.

> **Important:** Cette function utilise l'identifier special `((date))` qui est resolved to the **runtime**, i.e. to each execution of the command. The value peut varier of une execution to l'autre.

## Syntax

```
$date
```

> **Note :** Cette function ne prend auca parameter.

## Return value

The date currentle, resolvede to each execution.

## Difference from les functions specifics

`$date[]` retourne the date complete. Pour obtenir of components specifics of the date, use :

| Function | Returns |
|----------|----------|
| `$day` | Le day of the months (1-31) |
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
