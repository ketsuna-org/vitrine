---
layout: doc
title: $calculate[]
translation_key: docs
category: "Math & Text"
function_name: calculate
syntax: $calculate[expression]
description: Évalue une expression mathématique complete (opérateurs, functions, compareasons).
---

# $calculate[]

The `$calculate[]` function est la function mathématique la plus thensante de BDFD. Elle allows évaluer des expressions mathématiques completes en utilisant un parser mathématique intégré.

## Syntax

```
$calculate[expression]
```

## Parameters

| Parameter   | Type   | Required | Description                                                    |
|-------------|--------|-------------|----------------------------------------------------------------|
| `expression`| string | Yes         | L'expression mathématique à évaluer.                           |

## Opérateurs supportés

| Opérateur | Description       | Example           |
|-----------|-------------------|--------------------|
| `+`       | Addition          | `5 + 3` → `8`     |
| `-`       | Soustraction      | `10 - 4` → `6`    |
| `*`       | Multiplication    | `6 * 7` → `42`    |
| `/`       | Division          | `15 / 3` → `5`    |
| `%`       | Modulo            | `17 % 5` → `2`    |
| `^`       | Puissance         | `2 ^ 8` → `256`   |

## Functions supportées

`sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `abs`, `sqrt`, `log`, `log10`, `floor`, `ceil`, `round`, `min`, `max`, `exp`

## Compareasons

The compareasons retournent `"true"` or `"false"` :

- `>` strictement supérieur
- `<` strictement inférieur
- `>=` supérieur or égal
- `<=` inférieur or égal
- `==` égal
- `!=` different

## Notes

- L'expression est évaluée with a parser mathématique côté server.
- The result est toudays retourné sous forme de string de becauseactères (même for numbers).
- The function supporte l'usage de variables BDFD comme `$getVar[]` in the expression.
- En cas d'expression invalid, le behavior dépend du parser (generally an error silencieuse or a result vide).
