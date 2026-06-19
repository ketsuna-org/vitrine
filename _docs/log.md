---
layout: doc
title: $log[]
translation_key: docs
category: "Math & Text"
function_name: log
syntax: $log[value]
description: Calcule le logarithme naturel (base e) d'un nombre.
---

# $log[]

La fonction `$log[]` calcule le **logarithme naturel** (ou logarithme népérien, noté `ln`), c'est-à-dire le logarithme en base `e` (≈ 2.71828).

## Syntaxe

```
$log[valeur]
```

## Paramètres

| Paramètre | Type   | Obligatoire | Description                                        |
|-----------|--------|-------------|----------------------------------------------------|
| `valeur`  | number | Oui         | Le nombre dont on veut le logarithme. Doit être > 0. |

## Comportement

- Retourne le logarithme naturel de la valeur sous forme de nombre décimal (double précision).
- `$log[1]` → `0` (car e^0 = 1).
- `$log[e]` → `1` (car e^1 = e).
- Pour `0` ou les nombres négatifs, le comportement est indéfini (peut retourner `-Infinity`, `NaN` ou une erreur).

## Exemples

**Logarithme de 1 :**
```
$log[1]
→ 0
```

**Logarithme de e (approx.) :**
```
$log[2.718281828]
→ ~1
```

**Logarithme d'un grand nombre :**
```
$log[1000]
→ 6.907755...
```

**Logarithme d'une fraction :**
```
$log[0.5]
→ -0.693147...
```

## Notes

- C'est le logarithme **naturel** (base e), pas le logarithme base 10.
- Pour le logarithme base 10, utilisez dans `$calculate[]` : `$calculate[log10(value)]`.
- Pour le logarithme dans une base arbitraire, utilisez la formule : `log_b(a) = ln(a) / ln(b)`, soit `$calculate[log(a) / log(b)]`.
- La fonction inverse est l'exponentielle : `$calculate[exp(value)]`.
- La précision est celle d'un `double` Java (~15 chiffres significatifs).
