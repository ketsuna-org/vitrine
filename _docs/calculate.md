---
layout: doc
title: $calculate[]
translation_key: docs
category: "Math & Text"
function_name: calculate
syntax: $calculate[expression]
description: Évalue une expression mathématique complète (opérateurs, fonctions, comparaisons).
parameters:
  - name: expression
    type: string
    required: true
    description: L'expression mathématique à évaluer. Supporte +, -, *, /, %, ^, (), les comparaisons (>, <, >=, <=, ==, !=) et des fonctions comme sin, cos, tan, abs, sqrt, log, floor, ceil, round, etc.
returns:
  type: string (number)
  description: Le résultat de l'évaluation sous forme de chaîne numérique. "true"/"false" pour les comparaisons.
related:
  - sum
  - sub
  - multi
  - divide
  - modulo
  - sqrt
  - log
  - floor
  - ceil
  - round
  - abs
examples:
  - title: Addition simple
    code: |
      $calculate[5 + 3 * 2]
  - title: Avec parenthèses et fonctions
    code: |
      $calculate[sqrt(16) + sin(0)]
  - title: Comparaison
    code: |
      $calculate[10 > 5]
  - title: Utilisation de modulo
    code: |
      $calculate[17 % 5]
  - title: Expression avec variables BDFD
    code: |
      $calculate[$getVar[prix] * 1.2]
---

# $calculate[]

La fonction `$calculate[]` est la fonction mathématique la plus puissante de BDFD. Elle permet d'évaluer des expressions mathématiques complètes en utilisant un parser mathématique intégré.

## Syntaxe

```
$calculate[expression]
```

## Paramètres

| Paramètre   | Type   | Obligatoire | Description                                                    |
|-------------|--------|-------------|----------------------------------------------------------------|
| `expression`| string | Oui         | L'expression mathématique à évaluer.                           |

## Opérateurs supportés

| Opérateur | Description       | Exemple           |
|-----------|-------------------|--------------------|
| `+`       | Addition          | `5 + 3` → `8`     |
| `-`       | Soustraction      | `10 - 4` → `6`    |
| `*`       | Multiplication    | `6 * 7` → `42`    |
| `/`       | Division          | `15 / 3` → `5`    |
| `%`       | Modulo            | `17 % 5` → `2`    |
| `^`       | Puissance         | `2 ^ 8` → `256`   |

## Fonctions supportées

`sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `abs`, `sqrt`, `log`, `log10`, `floor`, `ceil`, `round`, `min`, `max`, `exp`

## Comparaisons

Les comparaisons retournent `"true"` ou `"false"` :

- `>` strictement supérieur
- `<` strictement inférieur
- `>=` supérieur ou égal
- `<=` inférieur ou égal
- `==` égal
- `!=` différent

## Notes

- L'expression est évaluée avec un parser mathématique côté serveur.
- Le résultat est toujours retourné sous forme de chaîne de caractères (même pour les nombres).
- La fonction supporte l'utilisation de variables BDFD comme `$getVar[]` dans l'expression.
- En cas d'expression invalide, le comportement dépend du parser (généralement une erreur silencieuse ou un résultat vide).
