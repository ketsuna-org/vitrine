---
layout: doc
title: $canvasRotate
translation_key: docs
category: "Canvas"
function_name: canvasRotate
syntax: $canvasRotate[degrees]
description: Fait pivoter le canvas d'un angle donné en degrés.
parameters:
  - name: degrees
    description: Angle de rotation en degrés. Positif = sens horaire, négatif = sens antihoraire.
returns:
  - type: void
    description: Le canvas est pivoté et redimensionné pour contenir l'image entière.
related:
  - $canvasGrayscale
  - $canvasInvert
  - $canvasSetPixel
examples:
  - description: Rotation de 90 degrés
    code: |
      $canvasRotate[90]
      $attachCanvas[]
  - description: Rotation de 45 degrés
    code: |
      $canvasRotate[45]
      $attachCanvas[]
---

# $canvasRotate

La fonction `$canvasRotate[degrees]` **fait pivoter le canvas courant** d'un angle spécifié en degrés. Le canvas est automatiquement redimensionné pour contenir l'image entière après rotation.

## Syntaxe

```
$canvasRotate[degrees]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `degrees` | Angle de rotation en degrés. Valeurs positives = sens horaire. Valeurs négatives = sens antihoraire. |

## Valeur de retour

Aucune. Le canvas est pivoté et redimensionné si nécessaire.

## Comportement

- La rotation se fait autour du centre du canvas.
- Le canvas est automatiquement élargi pour éviter de couper l'image.
- Les pixels en dehors de l'image originale deviennent transparents.
- Les valeurs d'angle sont normalisées modulo 360.

## Exemples

### Rotation simple à 90°

```bdfd
$canvasLoad[$attachment]
$canvasRotate[90]
$attachCanvas[]
$sendMessage[↪️ Image pivotée de 90° !]
```

### Retournement complet (180°)

```bdfd
$canvasLoad[$attachment]
$canvasRotate[180]
$attachCanvas[]
$sendMessage[🔃 Image retournée !]
```

### Rotation antihoraire

```bdfd
$canvasLoad[$attachment]
$canvasRotate[-45]
$attachCanvas[]
$sendMessage[↩️ Rotation antihoraire de 45° !]
```

### Rotation contrôlée par l'utilisateur

```bdfd
$canvasLoad[$attachment]
$canvasRotate[$message[1]]
$attachCanvas[]
$sendMessage[L'image a été pivotée de $message[1]° !]
```

## Notes

- Le canvas doit avoir été créé ou chargé avant rotation.
- La rotation à 90°, 180° ou 270° est optimisée et ne dégrade pas la qualité.
- Les rotations non-orthogonales (ex: 45°) nécessitent un rééchantillonnage.
