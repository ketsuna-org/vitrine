---
layout: doc
title: $day[]
translation_key: docs
category: "Date & Time"
function_name: day
syntax: $day
description: Returns the day current du months (1 à 31). Resolved au runtime.
---

# $day[]

The `$day[]` function returns the day current du months (de 1 à 31).

> **Important:** Cette function utilise l'identifier special `((day))` qui est resolved au **runtime**.

## Syntax

```
$day
```

> **Note :** Cette function ne prend auca parameter.

## Return value

A number between 1 and 31 representing le day current du months.

## Examples

### Jour simple

```bdfd
Jour : $day
```

### Message conditionnel

```bdfd
$if[$day==1]
🎉 This is le first du months !
$else
📅 Nous sommes le $day du months.
$endif
```

### Jour in an embed

```bdfd
$title[📅 Audayd'hui]
$description[Nous sommes le day **$day** du months]
```

## Notes

- La value dépend de the date système of the server exécutant the bot.
- Returns `1` for the first day du months, `31` for the last day possible.
