---
layout: doc
title: $addMediaGallery[]
translation_key: docs
category: "Embed & Message"
function_name: addMediaGallery
syntax: $addMediaGallery[(id)]
description: Crée a gallery média in a message. The galerie regroupe multiple éléments média (images) qui can be parcourus par the user.
---

# $addMediaGallery[] — Galerie Média

`$addMediaGallery[]` crée a container de galerie permettant d'afficher multiple images dans a component interactif. The user peut naviguer between thes images de la galerie.

## Syntax

```
$addMediaGallery[(id)]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `id` | No | Optional identifier for the galerie. |

## Return value

Initialise a gallery média. The éléments are added avec `$addMediaGalleryItem[]`. The galerie is displayede comme a component interactif avec navigation.

## Usage

### Simple gallery

```bdfd
$addMediaGallery[portfolio]
$addMediaGalleryItem[https://cdn.example.com/work1.png;Projet 1]
$addMediaGalleryItem[https://cdn.example.com/work2.png;Projet 2]
$addMediaGalleryItem[https://cdn.example.com/work3.png;Projet 3]
```

### Galerie in a container

```bdfd
$addContainer[showcase;#E67E22;no]
$addSection
$addTextDisplay[**Galerie de créations**]
$addMediaGallery[creations]
$addMediaGalleryItem[$var[img1];Création originale]
$addMediaGalleryItem[$var[img2];Variante]
$addMediaGalleryItem[$var[img3];Version finale]
```

### Gallery with spoiler

```bdfd
$addMediaGallery[spoiler_gallery]
$addMediaGalleryItem[https://cdn.example.com/secret.png;Contenu excludedsif;yes]
$addMediaGalleryItem[https://cdn.example.com/bonus.png;Bonus;yes]
```

### Dans an embed complete

```bdfd
$title[Portfolio]
$description[Découvrez mes lasts créations]
$color[#5865F2]
$addMediaGallery[works]
$addMediaGalleryItem[https://site.com/img1.jpg;Design A]
$addMediaGalleryItem[https://site.com/img2.jpg;Design B]
$addMediaGalleryItem[https://site.com/img3.jpg;Design C]
$footer[Page 1/1]
```

## Notes

- Les éléments de la galerie are added avec `$addMediaGalleryItem[]`.
- La navigation between images se fait via arrows dans the interface Discord.
- The ID de galerie dans `$addMediaGalleryItem[]` can be omis to target la last galerie createde.
- Les URLs doivent pointer vers images accessibles publicment.
