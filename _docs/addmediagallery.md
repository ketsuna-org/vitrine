---
layout: doc
title: $addMediaGallery[]
translation_key: docs
category: "Embed & Message"
function_name: addMediaGallery
syntax: $addMediaGallery[(id)]
description: Crée une galerie média dans un message. La galerie regroupe plusieurs éléments média (images) qui peuvent être parcourus par l'utilisateur.
---

# $addMediaGallery[] — Galerie Média

`$addMediaGallery[]` crée un conteneur de galerie permettant d'afficher plusieurs images dans un composant interactif. L'utilisateur peut naviguer entre les images de la galerie.

## Syntaxe

```
$addMediaGallery[(id)]
```

## Paramètres

| Paramètre | Obligatoire | Description |
|-----------|-------------|-------------|
| `id` | Non | Identifiant optionnel de la galerie. |

## Valeur de retour

Initialise une galerie média. Les éléments sont ajoutés avec `$addMediaGalleryItem[]`. La galerie est affichée comme un composant interactif avec navigation.

## Utilisation

### Galerie simple

```bdfd
$addMediaGallery[portfolio]
$addMediaGalleryItem[https://cdn.example.com/work1.png;Projet 1]
$addMediaGalleryItem[https://cdn.example.com/work2.png;Projet 2]
$addMediaGalleryItem[https://cdn.example.com/work3.png;Projet 3]
```

### Galerie dans un conteneur

```bdfd
$addContainer[showcase;#E67E22;no]
$addSection
$addTextDisplay[**Galerie de créations**]
$addMediaGallery[creations]
$addMediaGalleryItem[$var[img1];Création originale]
$addMediaGalleryItem[$var[img2];Variante]
$addMediaGalleryItem[$var[img3];Version finale]
```

### Galerie avec spoiler

```bdfd
$addMediaGallery[spoiler_gallery]
$addMediaGalleryItem[https://cdn.example.com/secret.png;Contenu exclusif;yes]
$addMediaGalleryItem[https://cdn.example.com/bonus.png;Bonus;yes]
```

### Dans un embed complet

```bdfd
$title[Portfolio]
$description[Découvrez mes dernières créations]
$color[#5865F2]
$addMediaGallery[works]
$addMediaGalleryItem[https://site.com/img1.jpg;Design A]
$addMediaGalleryItem[https://site.com/img2.jpg;Design B]
$addMediaGalleryItem[https://site.com/img3.jpg;Design C]
$footer[Page 1/1]
```

## Notes

- Les éléments de la galerie sont ajoutés avec `$addMediaGalleryItem[]`.
- La navigation entre images se fait via des flèches dans l'interface Discord.
- L'ID de galerie dans `$addMediaGalleryItem[]` peut être omis pour cibler la dernière galerie créée.
- Les URLs doivent pointer vers des images accessibles publiquement.
