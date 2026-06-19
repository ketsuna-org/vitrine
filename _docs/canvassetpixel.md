---
layout: doc
title: $canvasSetPixel
translation_key: docs
category: "Canvas"
function_name: canvasSetPixel
syntax: $canvasSetPixel[x;y;color]
description: Sets the couleur d'un pixel spécifique on the canvas.
---

# $canvasSetPixel

The `$canvasSetPixel[x;y;color]` function **définit the color d'un pixel unique** on the canvas aux coordatas spécifiées.

## Syntax

```
$canvasSetPixel[x;y;color]
```

## Parameters

| Parameter | Description |
|---|---|
| `x` | Coordata X du pixel. 0 = le bord gauche du canvas. |
| `y` | Coordata Y du pixel. 0 = le bord supérieur du canvas. |
| `color` | Couleur à appliquer, in the format hexadecimal (`#RRGGBB`) or nom de couleur (`red`, `blue`, etc.). |

## Return value

None. The pixel est modified directly on the canvas.

## Behavior

- Les coordatas hors des limits du canvas sont ignorées (pas error).
- Le canal alpha du pixel is kept tel quel.
- Functionne sur tout canvas previously created or loaded.

## Examples

### Pixel unique

```bdfd
$canvasCreate[100;100]
$canvasSetPixel[50;50;#FF0000]
$attachCanvas[]
$sendMessage[🔴 Pixel rouge placé au cbetween !]
```

### Dessiner a row horizontal

```bdfd
$canvasCreate[200;100]
$for[x;0;199;1]
  $canvasSetPixel[$for[x];50;#5865F2]
$endfor
$attachCanvas[]
$sendMessage[📏 Ligne bleue dessinée !]
```

### Croix au centre

```bdfd
$canvasCreate[100;100]
$for[i;30;70;1]
  $canvasSetPixel[$for[i];50;#FF0000]
  $canvasSetPixel[50;$for[i];#FF0000]
$endfor
$attachCanvas[]
$sendMessage[➕ Croix rouge dessinée !]
```

### Dessiner où the user clicks (interaction)

```bdfd
$canvasSetPixel[$mouseX;$mouseY;$message[1]]
$attachCanvas[]
```

## Notes

- Les coordatas commencent à 0 (pas à 1).
- Pour remplir une zone entière, use `$canvasFill[]` or `$canvasDrawRect[]`.
- Pour lire un pixel, use `$canvasGetPixel[]`.
- La modification de many pixels un par un can be slowe ; préférez les functions de dessin vectoriel.
