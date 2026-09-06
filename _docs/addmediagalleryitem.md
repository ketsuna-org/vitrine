---
layout: doc
title: $addMediaGalleryItem[]
translation_key: docs
category: "Components & Interactions"
function_name: addMediaGalleryItem
syntax: $addMediaGalleryItem[url;(description);(spoiler);(galleryId)]
description: Adds an element (image) to a media gallery. If galleryId is omitted, the element is added to the last gallery created.
---

# $addMediaGalleryItem[] — Gallery Item

`$addMediaGalleryItem[]` adds an image to a media gallery created with `$addMediaGallery[]`. Each element becomes a navigable "page" in the gallery.

## Syntax

```
$addMediaGalleryItem[url;(description);(spoiler);(galleryId)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `url` | Yes | — | URL of the image. |
| `description` | No | — | Description / alternative text. |
| `spoiler` | No | `no` | `yes` to spoiler. |
| `galleryId` | No | Last gallery | ID of the target gallery. |

## Return value

Adds the image to the gallery. No direct return value.

## Usage

### With explicit galleryId

```bdfd
$addMediaGallery[before_after]
$addMediaGalleryItem[https://cdn.example.com/before.jpg;Before renovation;no;before_after]
$addMediaGalleryItem[https://cdn.example.com/after.jpg;After renovation;no;before_after]
```

### Without galleryId (last gallery)

```bdfd
$addMediaGallery
$addMediaGalleryItem[https://site.com/img1.png;Capture 1]
$addMediaGalleryItem[https://site.com/img2.png;Capture 2]
$addMediaGalleryItem[https://site.com/img3.png;Capture 3]
```

### Multiple distinct galleries

```bdfd
$addMediaGallery[designs]
$addMediaGalleryItem[https://cdn.example.com/d1.png;Mobile design;no;designs]
$addMediaGalleryItem[https://cdn.example.com/d2.png;Desktop design;no;designs]

$addMediaGallery[logos]
$addMediaGalleryItem[https://cdn.example.com/logo_light.png;Light logo;no;logos]
$addMediaGalleryItem[https://cdn.example.com/logo_dark.png;Dark logo;no;logos]
```

### With spoiler

```bdfd
$addMediaGallery[nsfw_content]
$addMediaGalleryItem[$var[exclusive01];Exclusive Content 1;yes;nsfw_content]
$addMediaGalleryItem[$var[exclusive02];Exclusive Content 2;yes;nsfw_content]
```

## Notes

- `galleryId` can be omitted; the element will target the most recently created gallery.
- If no gallery has been created, the behavior is undefined.
- The `spoiler` parameter hides the image until the user clicks on it (useful for sensitive content).
- URLs must be publicly accessible.

