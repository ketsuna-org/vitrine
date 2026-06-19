---
layout: doc
title: $i
translation_key: docs
category: "Loops & Iteration"
function_name: i
syntax: $i
description: Alias de $loopIndex. Returns the index current (numéro d'itération) dans une boucle $forEach, $while, or $repeat.
aliases:
  - $loopIndex
---
# $i (alias de $loopIndex)

The function `$i` est un **alias raccourci** de `$loopIndex`. Elle retourne le numéro de l'itération in progress dans une boucle.

## Syntax

```
$i
```

## Parameters

Aucun.

## Return Value

- **Type** : Number (string)
- L'index current (1-based pour `$forEach`, 0-based pour `$while`/`$repeat`).

## Behavior

- Dans `$forEach` : commence à 1.
- Dans `$while` and `$repeat` : commence à 0 or selon votre compteur.
- Incrémenté automatically à each itération.

## Examples

### ForEach avec index

```bdfd
$forEach[user;$mentioned]
  $sendMessage[#$i : <@$loopValue>]
$endForEach
```

### List numérotée

```bdfd
$title[📋 List des members]
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

- `$i` est identical à `$loopIndex` — juste plus court and plus fast à taper.
- Très utilisé in thes boucles for the numérotations.
- Dans `$forEach`, `$i` commence à 1, pas 0.
