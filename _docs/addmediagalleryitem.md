---
layout: doc
title: $addMediaGalleryItem[]
translation_key: docs
category: "Embed & Message"
function_name: addMediaGalleryItem
syntax: $addMediaGalleryItem[url;(description);(spoiler);(galleryId)]
description: Adds a élément (image) à a gallery média. Si galleryId est omis, l'élément is added à la last galerie createde.
---

# $addMediaGalleryItem[] — Élément de Galerie

`$addMediaGalleryItem[]` ajoute an image à a gallery média createde avec `$addMediaGallery[]`. Each élément devient une "page" navigable in the gallery.

## Syntax

```
$addMediaGalleryItem[url;(description);(spoiler);(galleryId)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `url` | Yes | — | URL of the image. |
| `description` | No | — | Description / text alternatif. |
| `spoiler` | No | `no` | `yes` pour spoiler. |
| `galleryId` | No | Last gallery | ID of the galerie cible. |

## Return value

Ajoute the image à la galerie. Pas de value de return directe.

## Usage

### With explicit galleryId

```bdfd
$addMediaGallery[before_after]
$addMediaGalleryItem[https://cdn.example.com/before.jpg;Avant rénovation;no;before_after]
$addMediaGalleryItem[https://cdn.example.com/after.jpg;Après rénovation;no;before_after]
```

### Without galleryId (last galerie)

```bdfd
$addMediaGallery
$addMediaGalleryItem[https://site.com/img1.png;Capture 1]
$addMediaGalleryItem[https://site.com/img2.png;Capture 2]
$addMediaGalleryItem[https://site.com/img3.png;Capture 3]
```

### Multiple distinct galleries

```bdfd
$addMediaGallery[designs]
$addMediaGalleryItem[https://cdn.example.com/d1.png;Design mobile;no;designs]
$addMediaGalleryItem[https://cdn.example.com/d2.png;Design desktop;no;designs]

$addMediaGallery[logos]
$addMediaGalleryItem[https://cdn.example.com/logo_light.png;Logo clair;no;logos]
$addMediaGalleryItem[https://cdn.example.com/logo_dark.png;Logo sombre;no;logos]
```

### With spoiler

```bdfd
$addMediaGallery[nsfw_content]
$addMediaGalleryItem[$var[excludedsive01];Contenu excludedsif 1;yes;nsfw_content]
$addMediaGalleryItem[$var[excludedsive02];Contenu excludedsif 2;yes;nsfw_content]
```

## Notes

- `galleryId` can be omis ; l'élément cible alors la galerie la plus recently createde.
- If no galerie n'has been createde, le behavior est indéfini.
- Le `spoiler` masque the image until the user clicks dessus (pratique pour contenu sensible).
- Les URLs must be accessibles publicment.
