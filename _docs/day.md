---
layout: doc
title: $day[]
translation_key: docs
category: "Date & Time"
function_name: day
syntax: $day
description: Retourne le jour actuel du mois (1 à 31). Résolu au runtime.
parameters: []
returns:
  - type: number (string)
    description: Le numéro du jour actuel dans le mois, entre 1 et 31.
related:
  - $date[]
  - $month[]
  - $year[]
examples:
  - description: Afficher le jour actuel
    code: $day
  - description: Message conditionnel selon le jour
    code: |
      $if[$day==1]
      C'est le premier du mois !
      $else
      Nous sommes le $day du mois.
      $endif
---

# $day[]

La fonction `$day[]` retourne le jour actuel du mois (de 1 à 31).

> **Important :** Cette fonction utilise l'identifiant spécial `((day))` qui est résolu au **runtime**.

## Syntaxe

```
$day
```

> **Note :** Cette fonction ne prend aucun paramètre.

## Valeur de retour

Un nombre entre 1 et 31 représentant le jour actuel du mois.

## Exemples

### Jour simple

```bdfd
Jour : $day
```

### Message conditionnel

```bdfd
$if[$day==1]
🎉 C'est le premier du mois !
$else
📅 Nous sommes le $day du mois.
$endif
```

### Jour dans un embed

```bdfd
$title[📅 Aujourd'hui]
$description[Nous sommes le jour **$day** du mois]
```

## Notes

- La valeur dépend de la date système du serveur exécutant le bot.
- Retourne `1` pour le premier jour du mois, `31` pour le dernier jour possible.
