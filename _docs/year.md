---
layout: doc
title: $year[]
translation_key: docs
category: "Date & Time"
function_name: year
syntax: $year
description: "Retourne l'année actuelle (ex: 2026). Résolu au runtime."
parameters: []
returns:
  - type: number (string)
    description: L'année actuelle, par exemple 2026.
related:
  - $date[]
  - $day[]
  - $month[]
examples:
  - description: Afficher l'année actuelle
    code: $year
  - description: Calculer l'âge à partir d'une année de naissance
    code: $sub[$year;1990]
---

# $year[]

La fonction `$year[]` retourne l'année actuelle.

> **Important :** Cette fonction utilise l'identifiant spécial `((year))` qui est résolu au **runtime**.

## Syntaxe

```
$year
```

> **Note :** Cette fonction ne prend aucun paramètre.

## Valeur de retour

L'année actuelle (par exemple `2026`), sous forme de chaîne de caractères.

## Exemples

### Année simple

```bdfd
Nous sommes en $year.
```

### Calcul d'âge

```bdfd
Vous êtes né en 2000 ? Vous avez $sub[$year;2000] ans !
```

### Copyright dynamique

```bdfd
$footer[© $year - MonBot]
```

## Notes

- L'année est basée sur l'horloge système du serveur exécutant le bot.
- Utile pour les footers de copyright dynamiques.
