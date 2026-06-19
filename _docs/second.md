---
layout: doc
title: $second[]
translation_key: docs
category: "Date & Time"
function_name: second
syntax: $second
description: Retourne la seconde actuelle (0 à 59). Résolu au runtime.
---

# $second[]

La fonction `$second[]` retourne la seconde actuelle (de 0 à 59).

> **Important :** Cette fonction utilise l'identifiant spécial `((second))` qui est résolu au **runtime**.

## Syntaxe

```
$second
```

> **Note :** Cette fonction ne prend aucun paramètre.

## Valeur de retour

Un nombre entre 0 et 59 représentant la seconde actuelle.

## Exemples

### Seconde simple

```bdfd
Seconde actuelle : $second
```

### Heure complète personnalisée

```bdfd
Il est précisément $hour:$minute et $second secondes.
```

### Horloge dans un embed

```bdfd
$title[🕐 Horloge]
$description[$hour:$minute:$second]
$footer[Mis à jour à chaque exécution]
```

## Notes

- Utilisez `$time[]` pour obtenir l'heure formatée `HH:MM:SS` directement.
