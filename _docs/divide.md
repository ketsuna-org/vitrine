---
layout: doc
title: $divide[]
translation_key: docs
category: "Math & Text"
function_name: divide
syntax: $divide[a;b]
description: Divise la première valeur par la seconde (a / b). Si le diviseur est 0, retourne 0 au lieu de produire une erreur.
---

# $divide[]

La fonction `$divide[]` effectue une division : `a / b`. Elle est protégée contre la division par zéro : au lieu de produire une erreur, elle retourne simplement `0`.

## Syntaxe

```
$divide[a;b]
```

## Paramètres

| Paramètre | Type   | Obligatoire | Description                      |
|-----------|--------|-------------|----------------------------------|
| `a`       | number | Oui         | Le dividende (numérateur).       |
| `b`       | number | Oui         | Le diviseur (dénominateur).      |

## Comportement

- Retourne le quotient `a / b`.
- Le résultat peut être un nombre décimal.
- **Si `b = 0`, retourne `0`** sans générer d'erreur. C'est une protection intégrée.

## Exemples

**Division simple :**
```
$divide[10;2]
→ 5
```

**Résultat décimal :**
```
$divide[10;3]
→ 3.333333...
```

**Division par zéro (protégée) :**
```
$divide[42;0]
→ 0
```

**Calcul de moyenne :**
```
$divide[$sum[12;15;18];3]
→ 15
```

## Notes

- La protection contre la division par zéro évite les crashs accidentels, mais attention : `0` peut être un résultat légitime ou un indicateur d'erreur selon le contexte.
- Pour un contrôle plus fin, utilisez `$calculate[a / b]` (qui peut se comporter différemment).
