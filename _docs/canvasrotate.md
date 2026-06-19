---
layout: doc
title: $canvasRotate
translation_key: docs
category: "Canvas"
function_name: canvasRotate
syntax: $canvasRotate[degrees]
description: Fait pivoter le canvas of un angle donné en degrés.
---

# $canvasRotate

The `$canvasRotate[degrees]` function **fait pivoter le canvas courant** of un angle spécifié en degrés. The canvas est automatically redimensionné to contain the image entière after rotation.

## Syntax

```
$canvasRotate[degrees]
```

## Parameters

| Parameter | Description |
|---|---|
| `degrees` | Angle of rotation en degrés. Values positives = sens horaire. Values négatives = sens antihoraire. |

## Return value

None. The canvas est pivoté and redimensionné if necessary.

## Behavior

- La rotation se fait autour of the cbetween of the canvas.
- Le canvas est automatically élargi pour éviter of couper the image.
- Les pixels en dehors of the image originale deviennent transparents.
- Les values of angle sont normalisées modulo 360.

## Examples

### Rotation simple to 90°

```bdfd
$canvasLoad[$attachment]
$canvasRotate[90]
$attachCanvas[]
$sendMessage[↪️ Image pivotée of 90° !]
```

### Returnsment complete (180°)

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
$sendMessage[↩️ Rotation antihoraire of 45° !]
```

### Rotation contrôlée par the user

```bdfd
$canvasLoad[$attachment]
$canvasRotate[$message[1]]
$attachCanvas[]
$sendMessage[L'image has been pivotée of $message[1]° !]
```

## Notes

- Le canvas must have été created or loaded before rotation.
- La rotation to 90°, 180° or 270° est optimisée and ne dégrade not the qualité.
- Les rotations non-orthogonales (ex: 45°) nécessitent un rééchantillonnage.
