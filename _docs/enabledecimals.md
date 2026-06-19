---
layout: doc
title: $enableDecimals
translation_key: docs
category: "Flags & Debug"
function_name: enableDecimals
syntax: $enableDecimals
description: Active l'affichage des decimales dans the results de calculs. Par default, BDFD arrondit the results numériques.
---
# $enableDecimals

The `$enableDecimals` function **active l'affichage des decimales** in thes calculs for the command in progress.

## Syntax

```
$enableDecimals
```

## Parameters

Aucun.

## Return value

None.

## Behavior

- Without `$enableDecimals`, BDFD arrondit the results de `$calculate[]`.
- Avec `$enableDecimals`, the results incluent les decimales.
- L'effet is limitd à la command in progress.

## Examples

### Calcul avec decimales

```bdfd
$enableDecimals
$sendMessage[10 ÷ 3 = $calculate[10/3]]
; Displays : 10 ÷ 3 = 3.3333333333333335
```

### Without decimale (default)

```bdfd
$sendMessage[10 ÷ 3 = $calculate[10/3]]
; Displays : 10 ÷ 3 = 3
```

### Compareason before/after

```bdfd
$let[sans;$calculate[10/3]]
$enableDecimals
$let[avec;$calculate[10/3]]
$sendMessage[Without : $without | Avec : $avec]
```

## Notes

- À placer before les calculs concernés.
- Pour arrondir à N decimales, use `$round[$calculate[...];N]`.
- Impacte also les divisions in thes conditions `$if[]`.
