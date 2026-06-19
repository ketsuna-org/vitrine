---
layout: doc
title: $canvasSetPixel
translation_key: docs
category: "Canvas"
function_name: canvasSetPixel
syntax: $canvasSetPixel[x;y;color]
description: Définit la couleur d'un pixel spécifique sur le canvas.
parameters:
  - name: x
    description: Coordonnée X du pixel (0 = bord gauche).
  - name: y
    description: Coordonnée Y du pixel (0 = bord haut).
  - name: color
    description: Couleur en hexadécimal (#RRGGBB) ou nom de couleur.
returns:
  - type: void
    description: Modifie le pixel cible du canvas.
related:
  - $canvasGrayscale
  - $canvasInvert
  - $canvasRotate
examples:
  - description: Définir un pixel en rouge
    code: |
      $canvasSetPixel[50;50;#FF0000]
      $attachCanvas[]
  - description: Tracer un pixel à la position de la souris
    code: |
      $canvasSetPixel[$mouseX;$mouseY;#00FF00]
---

# $canvasSetPixel

La fonction `$canvasSetPixel[x;y;color]` **définit la couleur d'un pixel unique** sur le canvas aux coordonnées spécifiées.

## Syntaxe

```
$canvasSetPixel[x;y;color]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `x` | Coordonnée X du pixel. 0 = le bord gauche du canvas. |
| `y` | Coordonnée Y du pixel. 0 = le bord supérieur du canvas. |
| `color` | Couleur à appliquer, au format hexadécimal (`#RRGGBB`) ou nom de couleur (`red`, `blue`, etc.). |

## Valeur de retour

Aucune. Le pixel est modifié directement sur le canvas.

## Comportement

- Les coordonnées hors des limites du canvas sont ignorées (pas d'erreur).
- Le canal alpha du pixel est conservé tel quel.
- Fonctionne sur tout canvas préalablement créé ou chargé.

## Exemples

### Pixel unique

```bdfd
$canvasCreate[100;100]
$canvasSetPixel[50;50;#FF0000]
$attachCanvas[]
$sendMessage[🔴 Pixel rouge placé au centre !]
```

### Dessiner une ligne horizontale

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

### Dessiner où l'utilisateur clique (interaction)

```bdfd
$canvasSetPixel[$mouseX;$mouseY;$message[1]]
$attachCanvas[]
```

## Notes

- Les coordonnées commencent à 0 (pas à 1).
- Pour remplir une zone entière, utilisez `$canvasFill[]` ou `$canvasDrawRect[]`.
- Pour lire un pixel, utilisez `$canvasGetPixel[]`.
- La modification de nombreux pixels un par un peut être lente ; préférez les fonctions de dessin vectoriel.
