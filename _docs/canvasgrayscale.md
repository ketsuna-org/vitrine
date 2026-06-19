---
layout: doc
title: $canvasGrayscale
translation_key: docs
category: "Canvas"
function_name: canvasGrayscale
syntax: $canvasGrayscale
description: Convertit le canvas courant en niveaux de gris. Pas de paramètres.
---

# $canvasGrayscale

La fonction `$canvasGrayscale` **convertit le canvas courant en niveaux de gris**, supprimant toutes les informations de couleur (saturation) tout en conservant la luminosité.

## Syntaxe

```
$canvasGrayscale
```

## Paramètres

Aucun.

## Valeur de retour

Aucune. Le canvas est modifié directement.

## Comportement

- Chaque pixel du canvas est converti en nuance de gris en fonction de sa luminance.
- La formule utilise généralement une moyenne pondérée des canaux RGB (30% rouge, 59% vert, 11% bleu).
- L'opération est irréversible (sauf si vous sauvegardez l'état avant).

## Exemples

### Conversion simple en noir et blanc

```bdfd
$canvasLoad[$attachment]
$canvasGrayscale
$attachCanvas[]
$sendMessage[🎨 Image convertie en niveaux de gris !]
```

### Effet photo ancienne

```bdfd
$canvasLoad[$attachment]
$canvasGrayscale
$canvasColor[#6b4c2a]  ;; Effet sépia via teinte
$attachCanvas[]
$sendMessage[🕰️ Effet vintage appliqué !]
```

### Avant/Après comparatif

```bdfd
$var[original;$attachment]
$canvasLoad[$var[original]]
$attachCanvas[avant.png]

$canvasGrayscale
$attachCanvas[apres.png]
$sendMessage[⚫ Original vs Niveaux de gris :]
```

## Notes

- Le canvas doit avoir été créé ou chargé avant d'appeler cette fonction (via `$canvasCreate[]`, `$canvasLoad[]`, etc.).
- Pour inverser les couleurs, utilisez plutôt `$canvasInvert`.
- Pour une rotation, utilisez `$canvasRotate[degrés]`.
