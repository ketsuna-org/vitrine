---
layout: doc
title: $canvasGrayscale
translation_key: docs
category: "Canvas"
function_name: canvasGrayscale
syntax: $canvasGrayscale
description: Converts the canvas courant en levelx of gris. Pas of parameters.
---

# $canvasGrayscale

The `$canvasGrayscale` function **converts the canvas courant en levelx of gris**, supprimant all information of couleur (saturation) tout en conservant la luminosité.

## Syntax

```
$canvasGrayscale
```

## Parameters

Aucun.

## Return value

None. The canvas est modified directly.

## Behavior

- Each pixel of the canvas est converted en nuance of gris depending on of sa luminance.
- La formule utilise generally une moyenne pondérée canaux RGB (30% rouge, 59% vert, 11% bleu).
- L'opération est irréversible (unless vous sauvegardez the state before).

## Examples

### Conversion simple en noir and blanc

```bdfd
$canvasLoad[$attachment]
$canvasGrayscale
$attachCanvas[]
$sendMessage[🎨 Image convertede en levelx of gris !]
```

### Effet photo oldne

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
$attachCanvas[before.png]

$canvasGrayscale
$attachCanvas[apres.png]
$sendMessage[⚫ Original vs Levelx of gris :]
```

## Notes

- Le canvas must have été created or loaded before of caller cette function (via `$canvasCreate[]`, `$canvasLoad[]`, etc.).
- Pour reverse thes couleurs, use plutôt `$canvasInvert`.
- Pour une rotation, use `$canvasRotate[degrés]`.
