---
layout: doc
title: $addMediaGalleryItem[]
translation_key: docs
category: "Embed & Message"
function_name: addMediaGalleryItem
syntax: $addMediaGalleryItem[url;(description);(spoiler);(galleryId)]
description: Ajoute un élément (image) à une galerie média. Si galleryId est omis, l'élément est ajouté à la dernière galerie créée.
---

# $addMediaGalleryItem[] — Élément de Galerie

`$addMediaGalleryItem[]` ajoute une image à une galerie média créée avec `$addMediaGallery[]`. Chaque élément devient une "page" navigable dans la galerie.

## Syntaxe

```
$addMediaGalleryItem[url;(description);(spoiler);(galleryId)]
```

## Paramètres

| Paramètre | Obligatoire | Défaut | Description |
|-----------|-------------|--------|-------------|
| `url` | Oui | — | URL de l'image. |
| `description` | Non | — | Description / texte alternatif. |
| `spoiler` | Non | `no` | `yes` pour spoiler. |
| `galleryId` | Non | Dernière galerie | ID de la galerie cible. |

## Valeur de retour

Ajoute l'image à la galerie. Pas de valeur de retour directe.

## Utilisation

### Avec galleryId explicite

```bdfd
$addMediaGallery[before_after]
$addMediaGalleryItem[https://cdn.example.com/before.jpg;Avant rénovation;no;before_after]
$addMediaGalleryItem[https://cdn.example.com/after.jpg;Après rénovation;no;before_after]
```

### Sans galleryId (dernière galerie)

```bdfd
$addMediaGallery
$addMediaGalleryItem[https://site.com/img1.png;Capture 1]
$addMediaGalleryItem[https://site.com/img2.png;Capture 2]
$addMediaGalleryItem[https://site.com/img3.png;Capture 3]
```

### Plusieurs galeries distinctes

```bdfd
$addMediaGallery[designs]
$addMediaGalleryItem[https://cdn.example.com/d1.png;Design mobile;no;designs]
$addMediaGalleryItem[https://cdn.example.com/d2.png;Design desktop;no;designs]

$addMediaGallery[logos]
$addMediaGalleryItem[https://cdn.example.com/logo_light.png;Logo clair;no;logos]
$addMediaGalleryItem[https://cdn.example.com/logo_dark.png;Logo sombre;no;logos]
```

### Avec spoiler

```bdfd
$addMediaGallery[nsfw_content]
$addMediaGalleryItem[$var[exclusive01];Contenu exclusif 1;yes;nsfw_content]
$addMediaGalleryItem[$var[exclusive02];Contenu exclusif 2;yes;nsfw_content]
```

## Notes

- `galleryId` peut être omis ; l'élément cible alors la galerie la plus récemment créée.
- Si aucune galerie n'a été créée, le comportement est indéfini.
- Le `spoiler` masque l'image jusqu'à ce que l'utilisateur clique dessus (pratique pour contenu sensible).
- Les URLs doivent être accessibles publiquement.
