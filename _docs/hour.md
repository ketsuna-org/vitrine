---
layout: doc
title: $hour[]
translation_key: docs
category: "Date & Time"
function_name: hour
syntax: $hour
description: Retourne l'heure actuelle (0 à 23). Résolu au runtime.
---

# $hour[]

La fonction `$hour[]` retourne l'heure actuelle au format 24 heures (de 0 à 23).

> **Important :** Cette fonction utilise l'identifiant spécial `((hour))` qui est résolu au **runtime**.

## Syntaxe

```
$hour
```

> **Note :** Cette fonction ne prend aucun paramètre.

## Valeur de retour

Un nombre entre 0 et 23 représentant l'heure actuelle.

| Valeur | Signification |
|--------|---------------|
| 0 | Minuit |
| 12 | Midi |
| 23 | 23h |

## Exemples

### Heure simple

```bdfd
Il est $hour heures.
```

### Message selon le moment de la journée

```bdfd
$if[$hour>=6&&$hour<12]
☀️ Bonjour ! Bonne matinée !
$elseif[$hour>=12&&$hour<18]
🌤️ Bon après-midi !
$elseif[$hour>=18&&$hour<22]
🌅 Bonne soirée !
$else
🌙 Bonne nuit !
$endif
```

## Notes

- Format 24 heures : `0` = minuit, `12` = midi, `23` = 23h.
- L'heure dépend du fuseau horaire du serveur exécutant le bot.
