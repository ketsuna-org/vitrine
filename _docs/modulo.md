---
layout: doc
title: $modulo[]
translation_key: docs
category: "Math & Text"
function_name: modulo
syntax: $modulo[a;b]
description: Calcule le reste de la division euclidienne de a par b (a % b). Si b = 0, retourne 0.
---

# $modulo[]

La fonction `$modulo[]` retourne le reste de la division euclidienne de `a` par `b` (opération modulo : `a % b`). Comme `$divide[]`, elle est protégée contre la division par zéro.

## Syntaxe

```
$modulo[a;b]
```

## Paramètres

| Paramètre | Type   | Obligatoire | Description        |
|-----------|--------|-------------|--------------------|
| `a`       | number | Oui         | Le dividende.      |
| `b`       | number | Oui         | Le diviseur.       |

## Comportement

- Retourne le reste de `a` divisé par `b`.
- Si `b = 0`, retourne `0` (protection intégrée).
- Le résultat a toujours le même signe que le dividende `a`.

## Exemples

**Modulo simple :**
```
$modulo[17;5]
→ 2
```

**Détection pair/impair :**
```
$modulo[$getVar[nombre];2]
→ 0 si pair, 1 si impair
```

**Avec multiples exacts :**
```
$modulo[20;5]
→ 0
```

**Modulo par zéro (protégé) :**
```
$modulo[42;0]
→ 0
```

## Cas d'usage courants

- Vérifier si un nombre est divisible par un autre.
- Alterner des comportements (pair/impair).
- Boucler une liste (index % taille).
- Calculer des cycles (toutes les N itérations).

## Notes

- Pour les nombres négatifs, le comportement suit la définition mathématique standard : `$modulo[-17;5]` → `-2`.
