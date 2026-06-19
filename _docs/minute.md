---
layout: doc
title: $minute[]
translation_key: docs
category: "Date & Time"
function_name: minute
syntax: $minute
description: Retourne la minute actuelle (0 à 59). Résolu au runtime.
---

# $minute[]

La fonction `$minute[]` retourne la minute actuelle (de 0 à 59).

> **Important :** Cette fonction utilise l'identifiant spécial `((minute))` qui est résolu au **runtime**.

## Syntaxe

```
$minute
```

> **Note :** Cette fonction ne prend aucun paramètre.

## Valeur de retour

Un nombre entre 0 et 59 représentant la minute actuelle.

## Exemples

### Minute simple

```bdfd
Minute actuelle : $minute
```

### Heure et minutes combinées

```bdfd
Il est $hour h $minute
```

### Format avec zéro devant

```bdfd
$if[$minute<10]
Il est $hour:0$minute
$else
Il est $hour:$minute
$endif
```

## Notes

- Utilisez `$time[]` pour obtenir l'heure complète au format `HH:MM:SS`.
- Combinée avec `$hour[]` et `$second[]`, cette fonction permet de créer des horloges personnalisées.
