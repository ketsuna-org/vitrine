---
layout: doc
title: $i
translation_key: docs
category: "Loops & Iteration"
function_name: i
syntax: $i
description: Alias de $loopIndex. Retourne l'index actuel (numéro d'itération) dans une boucle $forEach, $while, ou $repeat.
parameters: []
returns:
  - type: number (string)
    description: L'index actuel de la boucle (commence à 1 ou 0 selon le type de boucle).
aliases:
  - $loopIndex
related:
  - $forEach
  - $while
  - $repeat
  - $loopLength
examples:
  - description: Afficher l'index dans une boucle
    code: |
      $forEach[user;$mentioned]
      $sendMessage[#$i - <@$loopValue>]
      $endForEach
---
# $i (alias de $loopIndex)

La fonction `$i` est un **alias raccourci** de `$loopIndex`. Elle retourne le numéro de l'itération en cours dans une boucle.

## Syntaxe

```
$i
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : Nombre (chaîne)
- L'index actuel (1-based pour `$forEach`, 0-based pour `$while`/`$repeat`).

## Comportement

- Dans `$forEach` : commence à 1.
- Dans `$while` et `$repeat` : commence à 0 ou selon votre compteur.
- Incrémenté automatiquement à chaque itération.

## Exemples

### ForEach avec index

```bdfd
$forEach[user;$mentioned]
  $sendMessage[#$i : <@$loopValue>]
$endForEach
```

### Liste numérotée

```bdfd
$title[📋 Liste des membres]
$description[
$forEach[member;$membersCount]
  $if[$i<=10]
    **#$i** — $username[$member[$i]]
  $endif
$endForEach
]
$sendMessage[]
```

### Boucle while avec index

```bdfd
$let[count;0]
$while[$var[count]<5]
  $sendMessage[Itération #$i]
  $let[count;$c[$var[count]+1]]
$endWhile
```

## Notes

- `$i` est identique à `$loopIndex` — juste plus court et plus rapide à taper.
- Très utilisé dans les boucles pour les numérotations.
- Dans `$forEach`, `$i` commence à 1, pas 0.
