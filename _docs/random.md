---
layout: doc
title: $random[]
translation_key: docs
category: "Math & Text"
function_name: random
syntax: $random[min;max]
description: Génère un nombre entier aléatoire entre min et max (inclus). La valeur est évaluée au compile-time uniquement.
---

# $random[]

La fonction `$random[]` génère un nombre entier aléatoire compris entre `min` et `max`, ces deux valeurs étant **incluses**.

**Important :** Cette fonction est évaluée au **compile-time**, ce qui signifie que la valeur est déterminée une seule fois lors de la compilation du code. Elle ne changera pas si le code est exécuté plusieurs fois sans recompilation.

## Syntaxe

```
$random[min;max]
```

## Paramètres

| Paramètre | Description |
|-----------|-------------|
| `min` | La borne inférieure de la plage aléatoire (incluse). |
| `max` | La borne supérieure de la plage aléatoire (incluse). |

## Valeur de retour

Un nombre entier aléatoire sous forme de chaîne de caractères, compris entre `min` et `max` (bornes incluses).

## Comportement

- Les valeurs sont évaluées une seule fois au moment de la compilation de la commande.
- Les deux bornes `min` et `max` sont incluses dans la plage possible.
- Si `max` est inférieur à `min`, le comportement peut être imprévisible.

## Exemples

### Nombre aléatoire entre 1 et 100

```bdfd
$random[1;100]
```

### Lancer de dé

```bdfd
🎲 Vous avez fait un **$random[1;6]** !
```

### Sélection aléatoire dans un embed

```bdfd
$title[Tirage au sort]
$description[Le numéro gagnant est : **$random[1000;9999]**]
$footer[🎉 Félicitations au gagnant !]
```

## Notes

- Utilisez `$randomString[]` pour générer des chaînes alphanumériques aléatoires.
- Utilisez `$randomText[]` pour choisir aléatoirement parmi une liste d'options textuelles.
