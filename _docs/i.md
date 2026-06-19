---
layout: doc
title: $i
translation_key: docs
category: "Loops & Iteration"
function_name: i
syntax: $i
description: Alias of $loopIndex. Returns the index current (numéro of itération) in a boucle $forEach, $while, or $repeat.
aliases:
  - $loopIndex
---
# $i (alias of $loopIndex)

The function `$i` est un **alias raccourci** of `$loopIndex`. Elle retourne le numéro of l'itération in progress in a boucle.

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

- Dans `$forEach` : commence to 1.
- Dans `$while` and `$repeat` : commence to 0 or according to votre compteur.
- Incrémenté automatically to each itération.

## Examples

### ForEach with index

```bdfd
$forEach[user;$mentioned]
  $sendMessage[#$i : <@$loopValue>]
$endForEach
```

### List numérotée

```bdfd
$title[📋 List members]
$description[
$forEach[member;$membersCount]
  $if[$i<=10]
    **#$i** — $username[$member[$i]]
  $endif
$endForEach
]
$sendMessage[]
```

### Boucle while with index

```bdfd
$let[count;0]
$while[$var[count]<5]
  $sendMessage[Itération #$i]
  $let[count;$c[$var[count]+1]]
$endWhile
```

## Notes

- `$i` est identical to `$loopIndex` — juste plus court and plus fast to taper.
- Très utilisé in thes boucles for the numérotations.
- Dans `$forEach`, `$i` commence to 1, pas 0.
