---
layout: doc
title: $canvasInvert
translation_key: docs
category: "Canvas"
function_name: canvasInvert
syntax: $canvasInvert
description: Inverse les couleurs du canvas courant (négatif). Pas de parameters.
---

# $canvasInvert

The `$canvasInvert` function **inverse les couleurs du canvas courant**, produisant un effet négatif. Each pixel voit their composantes R, G, B replacedes par `255 - value`.

## Syntax

```
$canvasInvert
```

## Parameters

Aucun.

## Return value

None. The canvas est modified directly.

## Behavior

- Each canal RGB est reversed : le blanc devient noir, le rouge devient cyan, etc.
- Caller `$canvasInvert` twice de suite restaure the image originale.
- Les pixels transparents are not affectés.

## Examples

### Inversion simple

```bdfd
$canvasLoad[$attachment]
$canvasInvert
$attachCanvas[]
$sendMessage[🔄 Image reversede !]
```

### Effet négatif temporary

```bdfd
$canvasLoad[$attachment]
$canvasInvert
$attachCanvas[negatif.png]
$canvasInvert  ;; Return à l'original
$attachCanvas[original.png]
$sendMessage[🔁 Original + Négatif :]
```

### Combinaison d'effets

```bdfd
$canvasLoad[$attachment]
$canvasGrayscale
$canvasInvert
$attachCanvas[]
$sendMessage[🎞️ Levelx de gris + Négatif !]
```

## Notes

- Le canvas must have été created or loaded au préalable.
- L'inversion est réversible (ré-caller la function).
- Pour un effet partial, use `$canvasSetPixel[]` pour inverser des pixels spécifiques.
