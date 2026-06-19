---
layout: doc
title: $addMediaGallery[]
translation_key: docs
category: "Embed & Message"
function_name: addMediaGallery
syntax: $addMediaGallery[(id)]
description: Creates a media gallery in a message. The gallery groups multiple media elements (images) that can be browsed by the user.
---

# $addMediaGallery[] — Media Gallery

`$addMediaGallery[]` creates a gallery container allowing the display of multiple images in an interactive component. The user can navigate between the images in the gallery.

## Syntax

```
$addMediaGallery[(id)]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `id` | No | Optional identifier for the gallery. |

## Return value

Initializes a media gallery. Elements are added using `$addMediaGalleryItem[]`. The gallery is displayed as an interactive component with navigation.

## Usage

### Simple gallery

```bdfd
$addMediaGallery[portfolio]
$addMediaGalleryItem[https://cdn.example.com/work1.png;Project 1]
$addMediaGalleryItem[https://cdn.example.com/work2.png;Project 2]
$addMediaGalleryItem[https://cdn.example.com/work3.png;Project 3]
```

### Gallery in a container

```bdfd
$addContainer[showcase;#E67E22;no]
$addSection
$addTextDisplay[**Creation Gallery**]
$addMediaGallery[creations]
$addMediaGalleryItem[$var[img1];Original Creation]
$addMediaGalleryItem[$var[img2];Variant]
$addMediaGalleryItem[$var[img3];Final Version]
```

### Gallery with spoiler

```bdfd
$addMediaGallery[spoiler_gallery]
$addMediaGalleryItem[https://cdn.example.com/secret.png;Exclusive Content;yes]
$addMediaGalleryItem[https://cdn.example.com/bonus.png;Bonus;yes]
```

### In a complete embed

```bdfd
$title[Portfolio]
$description[Discover my latest creations]
$color[#5865F2]
$addMediaGallery[works]
$addMediaGalleryItem[https://site.com/img1.jpg;Design A]
$addMediaGalleryItem[https://site.com/img2.jpg;Design B]
$addMediaGalleryItem[https://site.com/img3.jpg;Design C]
$footer[Page 1/1]
```

## Notes

- Gallery elements are added using `$addMediaGalleryItem[]`.
- Navigation between images is done using arrows in the Discord interface.
- The gallery ID in `$addMediaGalleryItem[]` can be omitted to target the last gallery created.
- URLs must point to publicly accessible images.

