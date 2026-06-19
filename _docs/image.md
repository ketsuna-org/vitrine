---
layout: doc
title: $image[]
translation_key: docs
category: "Embed & Message"
function_name: image
syntax: $image[url;(embedIndex)]
description: Définit la grande image d'un embed Discord. L'image apparaît en bas de l'embed, sous les fields et la description, en pleine largeur.
parameters:
  - name: url
    description: "URL de l'image à afficher. Formats supportés : PNG, JPG, GIF, WebP."
  - name: embedIndex
    description: "Optionnel. Index de l'embed ciblé (défaut : 0)."
returns:
  - type: void
    description: Modifie la réponse en cours de construction.
related:
  - $thumbnail[]
  - $title[]
  - $description[]
  - $sendMessage[]
examples:
  - description: Embed avec une image
    code: |
      $title[Belle photo du jour]
      $description[Voici la photo du jour !]
      $image[https://example.com/photo.jpg]
      $color[#5865F2]
  - description: Image avec variable dynamique
    code: $image[$authorAvatar]
  - description: Embed complet avec image et thumbnail
    code: |
      $title[Produit en vedette]
      $description[**Prix :** 19.99€]
      $thumbnail[https://example.com/icon.png]
      $image[https://example.com/product-banner.png]
      $color[#FEE75C]
---

# $image[]

La fonction `$image[]` définit la **grande image** d'un embed Discord. L'image est affichée en bas de l'embed, en pleine largeur, après la description et les fields.

## Syntaxe

```
$image[url;(embedIndex)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `url` | URL de l'image à afficher. Doit être une URL directe vers un fichier image (PNG, JPG, GIF, WebP). |
| `embedIndex` | Optionnel. Index de l'embed ciblé (0 par défaut). |

## Valeur de retour

Modifie la réponse en cours de construction. Ne retourne rien.

## Comportement

- L'image occupe toute la largeur de l'embed.
- Si l'URL est invalide ou l'image inaccessible, l'embed s'affichera sans image.
- Un seul appel à `$image[]` par embed : le dernier appel écrase le précédent.

## Différence entre $image[] et $thumbnail[]

| Fonction | Position | Taille |
|---|---|---|
| `$image[]` | En bas de l'embed | Grande, pleine largeur |
| `$thumbnail[]` | En haut à droite | Petite (carré) |

## Exemples

### Image simple

```bdfd
$title[Photo du jour]
$description[Une magnifique photo sélectionnée pour vous.]
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

### Embed avec image et thumbnail combinés

```bdfd
$title[Nouveau produit]
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

- L'URL doit être accessible publiquement (pas de chemins locaux).
- Les formats supportés incluent PNG, JPEG, GIF (animé ou statique), et WebP.
- Pour une petite image en haut à droite, utilisez `$thumbnail[]` plutôt que `$image[]`.
