---
layout: doc
title: $date[]
translation_key: docs
category: "Date & Time"
function_name: date
syntax: $date
description: Retourne la date actuelle. Cette fonction est résolue au runtime.
---

# $date[]

La fonction `$date[]` retourne la date actuelle.

> **Important :** Cette fonction utilise l'identifiant spécial `((date))` qui est résolu au **runtime**, c'est-à-dire à chaque exécution de la commande. La valeur peut varier d'une exécution à l'autre.

## Syntaxe

```
$date
```

> **Note :** Cette fonction ne prend aucun paramètre.

## Valeur de retour

La date actuelle, résolue à chaque exécution.

## Différence avec les fonctions spécifiques

`$date[]` retourne la date complète. Pour obtenir des composants spécifiques de la date, utilisez :

| Fonction | Retourne |
|----------|----------|
| `$day` | Le jour du mois (1-31) |
| `$month` | Le mois (1-12) |
| `$year` | L'année (ex: 2026) |

## Exemples

### Date simple

```bdfd
Nous sommes le $date
```

### Date dans un embed

```bdfd
$title[📅 Informations]
$description[Date actuelle : $date]
$footer[Heure du serveur]
```

## Notes

- La date est basée sur l'horloge système du serveur exécutant le bot.
