---
layout: doc
title: $canvasInvert
translation_key: docs
category: "Canvas"
function_name: canvasInvert
syntax: $canvasInvert
description: Inverse les couleurs du canvas courant (négatif). Pas de paramètres.
---

# $canvasInvert

La fonction `$canvasInvert` **inverse les couleurs du canvas courant**, produisant un effet négatif. Chaque pixel voit ses composantes R, G, B remplacées par `255 - valeur`.

## Syntaxe

```
$canvasInvert
```

## Paramètres

Aucun.

## Valeur de retour

Aucune. Le canvas est modifié directement.

## Comportement

- Chaque canal RGB est inversé : le blanc devient noir, le rouge devient cyan, etc.
- Appeler `$canvasInvert` deux fois de suite restaure l'image originale.
- Les pixels transparents ne sont pas affectés.

## Exemples

### Inversion simple

```bdfd
$canvasLoad[$attachment]
$canvasInvert
$attachCanvas[]
$sendMessage[🔄 Image inversée !]
```

### Effet négatif temporaire

```bdfd
$canvasLoad[$attachment]
$canvasInvert
$attachCanvas[negatif.png]
$canvasInvert  ;; Retour à l'original
$attachCanvas[original.png]
$sendMessage[🔁 Original + Négatif :]
```

### Combinaison d'effets

```bdfd
$canvasLoad[$attachment]
$canvasGrayscale
$canvasInvert
$attachCanvas[]
$sendMessage[🎞️ Niveaux de gris + Négatif !]
```

## Notes

- Le canvas doit avoir été créé ou chargé au préalable.
- L'inversion est réversible (ré-appeler la fonction).
- Pour un effet partiel, utilisez `$canvasSetPixel[]` pour inverser des pixels spécifiques.
