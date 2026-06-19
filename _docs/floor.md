---
layout: doc
title: $floor[]
translation_key: docs
category: "Math & Text"
function_name: floor
syntax: $floor[value]
description: Arrondit un nombre à l'entier inférieur (troncature vers le bas).
---

# $floor[]

La fonction `$floor[]` retourne le plus grand entier inférieur ou égal à la valeur donnée. Elle « descend » toujours vers l'entier inférieur.

## Syntaxe

```
$floor[valeur]
```

## Paramètres

| Paramètre | Type   | Obligatoire | Description                            |
|-----------|--------|-------------|----------------------------------------|
| `valeur`  | number | Oui         | Le nombre à arrondir vers le bas.      |

## Comportement

- Pour un nombre positif : supprime la partie décimale. `$floor[3.9]` → `3`.
- Pour un nombre négatif : descend vers l'entier inférieur (plus négatif). `$floor[-3.1]` → `-4`.
- Pour un entier : retourne l'entier lui-même.

## Exemples

**Nombre positif :**
```
$floor[3.9]
→ 3

$floor[3.1]
→ 3
```

**Nombre négatif :**
```
$floor[-3.1]
→ -4

$floor[-3.9]
→ -4
```

**Entier :**
```
$floor[5]
→ 5
```

## Comparaison floor / ceil / round

| Valeur | $floor[] | $ceil[] | $round[] |
|--------|----------|---------|----------|
| `3.2`  | `3`      | `4`     | `3`      |
| `3.5`  | `3`      | `4`     | `4`      |
| `3.9`  | `3`      | `4`     | `4`      |
| `-3.2` | `-4`     | `-3`    | `-3`     |
| `-3.5` | `-4`     | `-3`    | `-3`*    |

*Le comportement exact de `$round[]` pour les valeurs à `.5` peut dépendre de l'implémentation.

## Notes

- Le résultat est toujours un entier (sous forme de chaîne).
- Utile pour les calculs de pagination, de niveaux, ou toute situation nécessitant un entier.
