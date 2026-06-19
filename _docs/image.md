---
layout: doc
title: $image[]
translation_key: docs
category: "Embed & Message"
function_name: image
syntax: $image[url;(embedIndex)]
description: Sets the grande image of an embed Discord. The image apparaît en bas of the embed, sous les fields and la description, en pleine largeur.
---

# $image[]

The function `$image[]` définit la **grande image** of an embed Discord. The image est displayede en bas of the embed, en pleine largeur, after la description and les fields.

## Syntax

```
$image[url;(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `url` | URL of the image à afficher. Doit être une URL directe vers un file image (PNG, JPG, GIF, WebP). |
| `embedIndex` | Optional. Index of the embed ciblé (0 default). |

## Return Value

Modifies the response in progress de construction. Returns nothing.

## Behavior

- L'image occupe toute la largeur of the embed.
- Si the URL est invalid or l'image inaccessible, the embed s'affichera without image.
- Un seul call à `$image[]` par embed : le last call écrase le previous.

## Différence between $image[] and $thumbnail[]

| Function | Position | Taille |
|---|---|---|
| `$image[]` | En bas of the embed | Grande, pleine largeur |
| `$thumbnail[]` | En haut à droite | Petite (becauseré) |

## Examples

### Image simple

```bdfd
$title[Photo du day]
$description[Une magnifique photo selectede pour vous.]
$image[https://picsum.photos/800/400]
$color[#5865F2]
$sendMessage[]
```

### Avatar en grande image

```bdfd
$title[Avatar de $username]
$description[**ID :** $authorID]
$image[$authorAvatar]
$color[#5865F2]
$sendMessage[]
```

### Embed avec image and thumbnail combinés

```bdfd
$title[New produit]
$description[
**Nom :** Casque Gaming Pro
**Prix :** 79.99€
**Disponibilité :** En stock ✅
]
$thumbnail[https://cdn.example.com/product-icon.png]
$image[https://cdn.example.com/product-banner.png]
$color[#57F287]
$sendMessage[]
```

## Notes

- The URL must be accessible publicment (pas de chemins locaux).
- Les formats supportés incluent PNG, JPEG, GIF (animé or static), and WebP.
- Pour une petite image en haut à droite, utilisez `$thumbnail[]` plutôt que `$image[]`.
