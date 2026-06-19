---
layout: doc
title: $day[]
translation_key: docs
category: "Date & Time"
function_name: day
syntax: $day
description: Returns the day current of the months (1 to 31). Resolved to the runtime.
---

# $day[]

The `$day[]` function returns the day current of the months (de 1 to 31).

> **Important:** Cette function utilise l'identifier special `((day))` qui est resolved to the **runtime**.

## Syntax

```
$day
```

> **Note :** Cette function ne prend auca parameter.

## Return value

A number between 1 and 31 representing le day current of the months.

## Examples

### Jour simple

```bdfd
Jour : $day
```

### Message conditionnel

```bdfd
$if[$day==1]
🎉 This is le first of the months !
$else
📅 Nous sommes le $day of the months.
$endif
```

### Jour in an embed

```bdfd
$title[📅 Audayd'hui]
$description[Nous sommes le day **$day** of the months]
```

## Notes

- La value dépend of the date système of the server exécutant the bot.
- Returns `1` for the first day of the months, `31` for the last day possible.
