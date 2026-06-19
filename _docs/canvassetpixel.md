---
layout: doc
title: $canvasSetPixel
translation_key: docs
category: "Canvas"
function_name: canvasSetPixel
syntax: $canvasSetPixel[x;y;color]
description: Sets the couleur of un pixel specific on the canvas.
---

# $canvasSetPixel

The `$canvasSetPixel[x;y;color]` function **définit the color of un pixel unique** on the canvas to the coordatas spécifiées.

## Syntax

```
$canvasSetPixel[x;y;color]
```

## Parameters

| Parameter | Description |
|---|---|
| `x` | Coordata X of the pixel. 0 = le bord gauche of the canvas. |
| `y` | Coordata Y of the pixel. 0 = le bord supérieur of the canvas. |
| `color` | Couleur to appliquer, in the format hexadecimal (`#RRGGBB`) or nom of couleur (`red`, `blue`, etc.). |

## Return value

None. The pixel est modified directly on the canvas.

## Behavior

- Les coordatas hors limits of the canvas sont ignorées (pas error).
- Le canal alpha of the pixel is kept tel quel.
- Functionne on tout canvas previously created or loaded.

## Examples

### Pixel unique

```bdfd
$canvasCreate[100;100]
$canvasSetPixel[50;50;#FF0000]
$attachCanvas[]
$sendMessage[🔴 Pixel rouge placé to the cbetween !]
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

### Croix to the centre

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

- Les coordatas commencent to 0 (pas to 1).
- Pour remplir une zone entière, use `$canvasFill[]` or `$canvasDrawRect[]`.
- Pour lire un pixel, use `$canvasGetPixel[]`.
- La modification of many pixels un par un can be slowe ; préférez les functions of dessin vectoriel.
