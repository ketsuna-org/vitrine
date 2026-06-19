---
layout: doc
title: $round[]
translation_key: docs
category: "Math & Text"
function_name: round
syntax: $round[value]
description: Arrondit un nombre à l'entier le plus proche. Les valeurs à .5 sont arrondies vers le haut ou selon l'arrondi bancaire selon l'implémentation.
---

# $round[]

La fonction `$round[]` arrondit un nombre à l'entier le plus proche selon les règles d'arrondi standard.

## Syntaxe

```
$round[valeur]
```

## Paramètres

| Paramètre | Type   | Obligatoire | Description                      |
|-----------|--------|-------------|----------------------------------|
| `valeur`  | number | Oui         | Le nombre à arrondir.            |

## Comportement

- Si la partie décimale est **strictement inférieure à .5** : arrondi vers le bas.
- Si la partie décimale est **supérieure ou égale à .5** : arrondi vers le haut.
- Pour un entier : retourne l'entier lui-même.

## Exemples

**Arrondi vers le haut :**
```
$round[3.5]
→ 4

$round[3.6]
→ 4

$round[3.9]
→ 4
```

**Arrondi vers le bas :**
```
$round[3.4]
→ 3

$round[3.1]
→ 3
```

**Nombre négatif :**
```
$round[-3.4]
→ -3

$round[-3.6]
→ -4
```

## Comparaison floor / ceil / round

| Valeur | $floor[] | $ceil[] | $round[] |
|--------|----------|---------|----------|
| `3.2`  | `3`      | `4`     | `3`      |
| `3.5`  | `3`      | `4`     | `4`      |
| `3.9`  | `3`      | `4`     | `4`      |
| `-3.2` | `-4`     | `-3`    | `-3`     |
| `-3.5` | `-4`     | `-3`    | `-3`*    |

*Le comportement exact pour les valeurs à `.5` peut dépendre de l'implémentation Java sous-jacente (`Math.round`).

## Notes

- Le résultat est toujours un entier (sous forme de chaîne).
- Utilisez `$floor[]` pour toujours arrondir vers le bas, `$ceil[]` pour toujours arrondir vers le haut.
- Pour un contrôle plus fin (nombre de décimales), utilisez `$calculate[]`.
