---
layout: doc
title: $month[]
translation_key: docs
category: "Date & Time"
function_name: month
syntax: $month
description: Retourne le mois actuel sous forme de numéro (1 à 12). Résolu au runtime.
---

# $month[]

La fonction `$month[]` retourne le numéro du mois actuel (de 1 à 12).

> **Important :** Cette fonction utilise l'identifiant spécial `((month))` qui est résolu au **runtime**.

## Syntaxe

```
$month
```

> **Note :** Cette fonction ne prend aucun paramètre.

## Valeur de retour

Un nombre entre 1 et 12 représentant le mois actuel :

| Valeur | Mois |
|--------|------|
| 1 | Janvier |
| 2 | Février |
| 3 | Mars |
| 4 | Avril |
| 5 | Mai |
| 6 | Juin |
| 7 | Juillet |
| 8 | Août |
| 9 | Septembre |
| 10 | Octobre |
| 11 | Novembre |
| 12 | Décembre |

## Exemples

### Mois simple

```bdfd
Mois actuel : $month
```

### Message saisonnier

```bdfd
$if[$month>=6&&$month<=8]
☀️ C'est l'été !
$elseif[$month==12||$month<=2]
❄️ C'est l'hiver !
$endif
```

## Notes

- La valeur dépend de la date système du serveur exécutant le bot.
