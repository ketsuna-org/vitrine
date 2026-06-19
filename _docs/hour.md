---
layout: doc
title: $hour[]
translation_key: docs
category: "Date & Time"
function_name: hour
syntax: $hour
description: Returns the hour currentle (0 à 23). Resolved au runtime.
---

# $hour[]

The function `$hour[]` retourne l'hour currentle au format 24 hours (de 0 à 23).

> **Important:** This function utilise l'identifier special `((hour))` qui est resolved au **runtime**.

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

### Message selon le moment de la daynée

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
- L'hour dépend du fuseau horaire of the server exécutant the bot.
