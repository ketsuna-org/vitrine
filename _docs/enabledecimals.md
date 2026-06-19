---
layout: doc
title: $enableDecimals
translation_key: docs
category: "Flags & Debug"
function_name: enableDecimals
syntax: $enableDecimals
description: Active l'affichage des décimales dans les résultats de calculs. Par défaut, BDFD arrondit les résultats numériques.
---
# $enableDecimals

La fonction `$enableDecimals` **active l'affichage des décimales** dans les calculs pour la commande en cours.

## Syntaxe

```
$enableDecimals
```

## Paramètres

Aucun.

## Valeur de retour

Aucune.

## Comportement

- Sans `$enableDecimals`, BDFD arrondit les résultats de `$calculate[]`.
- Avec `$enableDecimals`, les résultats incluent les décimales.
- L'effet est limité à la commande en cours.

## Exemples

### Calcul avec décimales

```bdfd
$enableDecimals
$sendMessage[10 ÷ 3 = $calculate[10/3]]
; Affiche : 10 ÷ 3 = 3.3333333333333335
```

### Sans décimale (défaut)

```bdfd
$sendMessage[10 ÷ 3 = $calculate[10/3]]
; Affiche : 10 ÷ 3 = 3
```

### Comparaison avant/après

```bdfd
$let[sans;$calculate[10/3]]
$enableDecimals
$let[avec;$calculate[10/3]]
$sendMessage[Sans : $sans | Avec : $avec]
```

## Notes

- À placer avant les calculs concernés.
- Pour arrondir à N décimales, utilisez `$round[$calculate[...];N]`.
- Impacte aussi les divisions dans les conditions `$if[]`.
