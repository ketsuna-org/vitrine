---
layout: doc
title: $hour[]
translation_key: docs
category: "Date & Time"
function_name: hour
syntax: $hour
description: Returns the hour currentle (0 to 23). Resolved to the runtime.
---

# $hour[]

The function `$hour[]` retourne l'hour currentle to the format 24 hours (de 0 to 23).

> **Important:** This function utilise l'identifier special `((hour))` qui est resolved to the **runtime**.

## Syntax

```
$hour
```

> **Note :** This function ne prend no parameter.

## Return Value

A number between 0 and 23 représentant l'hour currentle.

| Value | Signification |
|--------|---------------|
| 0 | Minuit |
| 12 | Midi |
| 23 | 23h |

## Examples

### Time simple

```bdfd
Il est $hour hours.
```

### Message according to the moment of la daynée

```bdfd
$if[$hour>=6&&$hour<12]
☀️ Bonday ! Bonne matinée !
$elseif[$hour>=12&&$hour<18]
🌤️ Bon after-midi !
$elseif[$hour>=18&&$hour<22]
🌅 Bonne soirée !
$else
🌙 Bonne nuit !
$endif
```

## Notes

- Format 24 hours : `0` = minuit, `12` = midi, `23` = 23h.
- L'hour dépend of the fuseau horaire of the server exécutant the bot.
